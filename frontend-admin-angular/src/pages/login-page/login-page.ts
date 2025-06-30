import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication-service';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage implements OnInit {
  private route = inject(Router);
  private authService = inject(AuthenticationService);
  error = "";
  email = "";
  password = "";

  ngOnInit(): void {
      this.authService.authObservable.subscribe(data => {
        if(data) {
          this.route.navigate(['/dashboard']);
        }
      })
  }

  validateLogin() {
    if(this.email === "admin@gmail.com" && this.password === "admin") {
      this.authService.login();
    }else{
      this.error = "invalid credentials";
    }
  }
}
