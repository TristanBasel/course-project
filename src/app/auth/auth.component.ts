import { Component } from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;// for user button.
  isLoading = false;// display that spinner if waiting for response
  error: string = null;//handle the errors.

  constructor(private authService: AuthService,// for authentication service functions, those that you need but don't want in the component itself.
              private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;// simply reverses the value.
  }

  onSubmit(form: NgForm) {// this is called in the form tag by NgSubmit when the form is submitted, must make sure other buttons are of type button.
    if (!form.valid) {
      return;
    }// this is just so that if the user has somehow enabled the button it makes sure they still can't submit the form without entry.
    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);// code for login
    } else { // we are definitely in signup mode.
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {// we of course get the response data
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
        },
      errorMessage => {// We may have to handle any error occurring.
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      });// use the auth service we created to handle the user signup.
    form.reset();
  }
}
