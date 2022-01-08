import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {

  }

  onRouteChange() {
    if (this.authenticationService.getCurrent().isLoggedIn || this.authenticationService.initialLoad) {
      this.authenticationService.getCurrentUser().subscribe({
        next: user => {
          if (this.authenticationService.initialLoad) {
            this.authenticationService.setUserData(user);
          }
        },
        error: () => {
          this.authenticationService.clearUserData();
        }
      });
    }
  }

}
