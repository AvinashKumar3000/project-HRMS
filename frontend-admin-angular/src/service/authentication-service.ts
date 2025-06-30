import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isAuth:boolean;
  authSubject = new BehaviorSubject(false);
  authObservable = this.authSubject.asObservable();

  constructor() {
    this.isAuth = false;
  }

  login() {
    this.isAuth = true;
    this.authSubject.next(this.isAuth);
  }
  logout() {
    this.isAuth = false;
    this.authSubject.next(this.isAuth);
  }
  getIsAuth() {
    return this.isAuth;
  }
}
