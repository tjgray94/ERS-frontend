import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Subscribe to auth service to get login status updates
    this.authService.isLoggedIn$.subscribe(
      loggedIn => this.isLoggedIn = loggedIn
    );
    
    // Update login status on route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkLoginStatus();
    });
    
    // Initial check
    this.checkLoginStatus();
  }
  
  checkLoginStatus(): void {
    // Check if user is logged in by looking for user ID in the URL
    const isInUserRoute = this.router.url.includes('/employee/') || 
                          this.router.url.includes('/manager/');
                          
    // If we're in a user route but not logged in according to the service,
    // update the service
    if (isInUserRoute && !this.isLoggedIn) {
      // Extract user ID and type from URL
      const urlParts = this.router.url.split('/');
      const userType = urlParts[1]; // 'employee' or 'manager'
      const userId = urlParts[2];
      
      if (userId) {
        this.authService.login(parseInt(userId), userType);
      }
    }
  }
  
  logout(): void {
    this.authService.logout();
  }
}
