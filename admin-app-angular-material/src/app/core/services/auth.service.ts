import { Injectable, signal } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AppUser {
  name: string;
  email: string;
  initials: string;
}

const SESSION_KEY = 'admin_app_session';

/**
 * Mock authentication service.
 * Replace the internals with real HTTP calls to your API —
 * the public methods/signals are what the rest of the app relies on.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUserSignal = signal<AppUser | null>(this.readSession());

  readonly currentUser = this.currentUserSignal.asReadonly();

  get isAuthenticated(): boolean {
    return this.currentUserSignal() !== null;
  }

  login(credentials: LoginCredentials): Observable<AppUser> {
    const user: AppUser = {
      name: credentials.email.split('@')[0] || 'User',
      email: credentials.email,
      initials: (credentials.email[0] || 'U').toUpperCase(),
    };

    // Simulated network latency — swap for a real HttpClient POST.
    return of(user).pipe(
      delay(600),
      tap((loggedInUser) => {
        this.currentUserSignal.set(loggedInUser);
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(loggedInUser));
      })
    );
  }

  sendPasswordReset(email: string): Observable<{ email: string }> {
    // Simulated network latency — swap for a real HttpClient POST.
    return of({ email }).pipe(delay(800));
  }

  logout(): void {
    this.currentUserSignal.set(null);
    sessionStorage.removeItem(SESSION_KEY);
  }

  private readSession(): AppUser | null {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AppUser) : null;
  }
}
