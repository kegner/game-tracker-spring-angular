import { Injectable, isDevMode } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ObservableState } from '../models/ObservableState';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly isLoggedIn = new ObservableState<boolean>(false);
  private readonly user = new ObservableState<User>({});
 
  private readonly _observables = {
    isLoggedIn$: this.isLoggedIn.value$,
    user$: this.user.value$
  }

  get observables() {
    return this._observables;
  }

  initialLoad: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) { }

  getCurrent() {
    return {
      isLoggedIn: this.isLoggedIn.value,
      user: this.user.value
    }
  }

  login(form: FormData, retry: boolean) {
    this.http.post("/api/login", form, { responseType: "text" }).subscribe({
      next: () => {
        this.getCurrentUser().subscribe({
          next: user => {
            this.setUserData(user);
            this.router.navigate(["/"]);
          },
          error: () => {
            this.clearUserData();
          }
        });
      },
      error: error => {
        // Need to attempt login twice for local development issues
        if (error.status === 404 && isDevMode() && !retry) {
          this.login(form, true);
        } else {
          this.toastService.showErrorToast("Login Failed.");
          console.error(error);
        }
      }
    });
  }

  logout() {
    this.http.post("/api/logout", {}, { responseType: "text" }).subscribe({
      next: () => {
        this.clearUserData();
        this.router.navigate(["/logout"]);
      },
      error: error => {
        // redirect to logout on 404 if in dev mode
        if (error.status === 404 && isDevMode()) {
          this.clearUserData();
          this.router.navigate(["/logout"]);
        } else {
          console.error(error);
        }
      }
    });
  }

  signup(user: User) {
    this.http.post("/api/v1/users", user).subscribe({
      next: () => {
        this.toastService.showSuccessToast("Sign up successful.");
      },
      error: error => {
        const validResponses = [404, 409];
        if (error && error.error && validResponses.includes(error.status)) {
          this.toastService.showErrorToast(error.error.message);
        } else {
          console.error(error);
        }
      }
    });
  }

  setUserData(user: User) {
    this.isLoggedIn.value = true;
    this.user.value = user;
    this.initialLoad = false;
  }

  clearUserData() {
    this.isLoggedIn.value = false;
    this.user.value = {};
    this.initialLoad = false;
  }

  getCurrentUser() {
    return this.http.get<User>("/api/v1/users/current-user");
  }
}
