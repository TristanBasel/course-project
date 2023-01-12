import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {// this interface is to create a model type thing for the response data from the signup request.
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  // store user as a subject:
  user = new BehaviorSubject<User>(null);//next a new user when there is a new user or token expired.

  constructor(private http: HttpClient,
              private router: Router) {// need this client to make http requests.
  }
  signup(email: string, password: string) {
    // here we want to make a signup request to the firebase api.
    return this.http.post<AuthResponseData>(// return this observable so that we can subscribe in the auth component.
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATs2ZAEZVVOIwKPsWD9nwAqhDJc4XRSwA',// For safety this would never actually
      // be in code but rather stored in a .env file which is then passed or stored on the server, but for now it's just a test app.
      {
        email: email,
        password: password,
        returnSecureToke: true
    })
      .pipe(catchError(this.handleError),
        tap(resData => {// this allows us to perform action without changing the data
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        })
      );
  }

  login(email: string, password: string) {
    // also send the request to the server.
    return this.http.post<AuthResponseData>(// must tell the method what data is expected
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyATs2ZAEZVVOIwKPsWD9nwAqhDJc4XRSwA',
      {
        email: email,
        password: password,
        returnSecureToke: true
      })
      .pipe(catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }


  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);// date object based on the expiresIn data information
    // from the response which as a string holding the number of seconds to expiration, this conversion is a new date plus the time to expiration
    // converted to a milliseconds because that's what the Dat() method gives. the new date outside wrap converts to a date so that it is of correct form.
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);// allows us to set the next user in our application
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';// default message
    if(!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'User with this email already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect password entered.';
        break;
      // case 'EMAIL_NOT_FOUND':
      //   errorMessage = 'This email does not exist';
      //   break;
    }
    return throwError(errorMessage);
  }
}
