import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";

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
    return this.http.post<AuthResponseData>(// return so we can subscribe in the auth component.
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATs2ZAEZVVOIwKPsWD9nwAqhDJc4XRSwA',
      {
        email: email,
        password: password,
        returnSecureToke: true
    })
  }
}
