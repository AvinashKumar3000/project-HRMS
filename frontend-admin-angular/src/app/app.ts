import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../service/authentication-service';
import  { UpperCasePipe } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UpperCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private authService = inject(AuthenticationService);
  protected title = 'frontend-admin-angular';
  public isAuth = false;

  constructor() {
    this.authService.authObservable.subscribe(data => {
      this.isAuth = data;
    });
  }

  handleLogout(){
    this.authService.logout();
  }
}
