import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthenticationService);

  ngOnInit(): void {
    this.authService.authObservable.subscribe((data) => {
      if(!data) {
        this.router.navigate(['/']);
      }
    });
  }
}
