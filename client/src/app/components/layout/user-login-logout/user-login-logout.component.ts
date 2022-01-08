import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-login-logout',
  templateUrl: './user-login-logout.component.html',
  styleUrls: ['./user-login-logout.component.css']
})
export class UserLoginLogoutComponent implements OnInit {

  user!: User;
  isLoggedIn!: boolean;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.observables.isLoggedIn$.subscribe(val => this.isLoggedIn = val);
    this.authenticationService.observables.user$.subscribe(val => this.user = val);
  }

  onLogout() {
    this.authenticationService.logout();
  }

}
