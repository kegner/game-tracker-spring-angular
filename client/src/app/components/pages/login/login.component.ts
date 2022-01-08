import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn!: boolean;
  firstName!: string | undefined;
  
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.observables.isLoggedIn$.subscribe(val => this.isLoggedIn = val);
    this.authenticationService.observables.user$.pipe(map(user => user.firstName)).subscribe(val => this.firstName = val);
  }

  onSubmit(form: NgForm) {
    const postForm = new FormData();
    postForm.append("username", form.controls["username"].value);
    postForm.append("password", form.controls["password"].value);
    this.authenticationService.login(postForm, false);
  }

}
