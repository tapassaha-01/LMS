import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthonticationService } from './shared/authontication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean = false;

  private routerSubscription: Subscription;

  constructor(private router: Router, public authService: AuthonticationService) {
    // Subscribe to Router events to handle navigation changes
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the user is logged in after navigation has occurred
        const isLoggedIn = this.authService.isLoggedIn();
        if (isLoggedIn && event.url === '/login') {
          // User is logged in but navigated back to login page, so logout
          this.authService.logout();
        }
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from Router events to avoid memory leaks
    this.routerSubscription.unsubscribe();
  }
}

