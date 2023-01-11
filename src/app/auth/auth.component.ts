import { Component } from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;// simply reverses the value.
  }

  onSubmit(form: NgForm) {// this is called in the form tag by NgSubmit when the form is submitted, must make sure other buttons are of type button.
    console.log(form);
    form.reset();
  }
}
