import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { catchError, throwError } from "rxjs";

interface AuthResponseData {// this interface is to create a model type thing for the response data from the signup request.
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {// need this client to make http requests.
  }
  signup(email: string, password: string) {
    // here we want to make a signup request to the firebase api.
    return this.http.post<AuthResponseData>(// return this observable so we can subscribe in the auth component.
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATs2ZAEZVVOIwKPsWD9nwAqhDJc4XRSwA',// For safety this would never actually
      // be in code but rather stored in a .env file which is then passed or stored on the server, but for now it's just a test app.
      {
        email: email,
        password: password,
        returnSecureToke: true
    })
      .pipe(catchError(errorRes => {
        let errorMessage = 'An unknown error occurred!';// default message
        if(!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'User with this email already exists!';
        }
        return throwError(errorMessage);
      }))
  }

  login(email: string, password: string) {
    // also send the request to the server.
  }
}
