import { Component } from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;// for user button.
  isLoading = false;// display that spinner if waiting for response
  error: string = null;//handle the errors.

  constructor(private  authService: AuthService) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;// simply reverses the value.
  }

  onSubmit(form: NgForm) {// this is called in the form tag by NgSubmit when the form is submitted, must make sure other buttons are of type button.
    if (!form.valid){ return;}// this is just so that if the user has somehow enabled the button it makes sure they still can't submit the form without entry.
    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      // ...
    } else { // we are definitely in signup mode.
       this.authService.signup(email, password).subscribe(
         resData => {// we of course get the response data
            console.log(resData);
            this.isLoading = false;
          },
          errorMessage => {// We may have to handle any error occurring.
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
          });// use the auth service we created to handle the user signup.
    }

    form.reset();
  }


}
