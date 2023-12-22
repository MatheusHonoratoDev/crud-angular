import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CoursesService } from './courses/services/courses.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  authGuardPath: string = '';
  currentRouteName: string = '';
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private authService: AuthService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.authGuardPath = event.url;
        this.updateCurrentRouteName();
      }
    });

    if (this.authService.isAuthenticated()) {
      this.coursesService.isAuthenticated = true;
    }
  }

  ngOnInit(): void {
  }

  get isAuthenticated(): boolean {
    return this.coursesService.isAuthenticated;
  }

  private updateCurrentRouteName(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    this.currentRouteName = route.snapshot.data['name'] || '';
  }

  isLoginPage(): boolean {
    return this.authGuardPath === '/login';
  }

  logout(): void {
    this.coursesService.isAuthenticated = false;
    this.authService.setAuthenticated(false);    
    this.authService.clearUserCredentials();

    this.router.navigate(['/login']);
  }

  isRoleAllowed(...expectedRoles: string[]): boolean {
    const userRole = this.authService.getUserRole();
    return expectedRoles.includes(userRole);
  }

  shouldShowIcon(expectedRoles: string[]): boolean {
    return this.isRoleAllowed(...expectedRoles);
  }
}
