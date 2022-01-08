import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  firstNameValidClass!: string;
  lastNameValidClass!: string;
  emailValidClass!: string;
  usernameValidClass!: string;
  passwordValidClass!: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const firstName = form.controls["firstName"].value;
    const lastName = form.controls["lastName"].value;
    const email = form.controls["email"].value;
    const username = form.controls["username"].value;
    const password = form.controls["password"].value;

    this.firstNameValidClass = !firstName ? "is-invalid" : "";
    this.lastNameValidClass = !lastName ? "is-invalid" : "";
    this.emailValidClass = !email ? "is-invalid" : "";
    this.usernameValidClass = !username ? "is-invalid" : "";
    this.passwordValidClass = !password ? "is-invalid" : "";

    if (this.firstNameValidClass || this.lastNameValidClass || this.emailValidClass ||
      this.usernameValidClass || this.passwordValidClass) return;

    const user: User = {
      firstName,
      lastName,
      email,
      username,
      password
    }

    this.authenticationService.signup(user);
  }
}
