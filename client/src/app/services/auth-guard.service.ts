import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authenticationService.getCurrentUser().subscribe({
        error: () => {
          this.authenticationService.clearUserData();
          this.router.navigate(["/login"]);
        },
        complete: () => {
          resolve(true);
        }
      });
    });
  }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }
}
