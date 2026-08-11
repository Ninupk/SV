import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription, filter } from 'rxjs';

/**
 * Full-screen authentication layout.
 *
 * Visual structure (see reference design):
 *  - a plain white top bar carrying the product logo/name
 *  - a dark, patterned backdrop filling the rest of the viewport
 *  - a heading + subheading (per-route, via route `data`) centered on the backdrop
 *  - a white card below it holding the actual form (login, forgot-password, ...)
 *
 * Child routes set their heading via route data, e.g.:
 *   { path: 'login', component: LoginComponent, data: { heading: 'Login', subheading: 'Welcome To ...' } }
 */
@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  readonly currentYear = new Date().getFullYear();
  readonly heading = signal('');
  readonly subheading = signal('');

  private routerSub?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.updateHeadingFromRoute();
    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateHeadingFromRoute());
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  private updateHeadingFromRoute(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const data = route.snapshot.data;
    this.heading.set(data['heading'] ?? '');
    this.subheading.set(data['subheading'] ?? '');
  }
}
