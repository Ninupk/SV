# SensorVision

An Angular 18 (standalone components) admin panel starter with Angular Material,
built around two layouts and a demo-ready dashboard.

## Getting started

```bash
npm install
npm start        # ng serve, then open http://localhost:4200
```

Login form accepts **any** email/password (see `src/app/core/services/auth.service.ts` —
it's a mock service you swap for real HTTP calls). You're redirected to `/dashboard`
after "signing in", and the `authGuard` sends you back to `/auth/login` if you visit
a protected route without a session.

## Structure

```
src/app/
├── layouts/
│   ├── auth-layout/        Full-screen layout, centers a form card. Used by
│   │                       /auth/login and /auth/forgot-password.
│   └── main-layout/        App shell: collapsible/responsive sidebar + top bar.
│                           Wraps all authenticated pages.
├── pages/
│   ├── login/               Reactive form, password visibility toggle,
│   │                        "remember me", link to forgot-password.
│   ├── forgot-password/     Reactive form -> success state (own component state,
│   │                        no dialog involved).
│   └── dashboard/           Stat cards + a clients table with a delete action
│                            that opens the shared confirm modal.
├── shared/
│   └── modals/
│       └── confirm-dialog/  Reusable MatDialog-based confirm/cancel modal.
│                            Open it from anywhere:
│                              this.dialog.open(ConfirmDialogComponent, {
│                                width: '400px',
│                                data: { title, message, tone: 'danger' }
│                              })
├── core/
│   ├── services/auth.service.ts   Mock auth (signals-based current user).
│   └── guards/auth.guard.ts       Protects the main-layout route tree.
├── app.routes.ts             Two route trees: /auth/* (AuthLayoutComponent)
│                              and /* (MainLayoutComponent, guarded).
└── app.config.ts             Router + async animations providers.
```

**Layout rule of thumb:** anything under `/auth` gets `AuthLayoutComponent`
(full-screen, centered card). Everything else nests under `MainLayoutComponent`
(sidebar + top bar). Add new authenticated pages as children of the `MainLayoutComponent`
route in `app.routes.ts`, and new public/auth pages as children of `AuthLayoutComponent`.

**Modals:** every modal lives in its own component under `shared/modals/`, opened
via `MatDialog` — never inlined into a page template. Follow the same pattern
(`ConfirmDialogComponent`) for new ones: a typed `data` interface, a `MatDialogRef`
for the return value, and its own `.component.ts/.html/.scss`.

## Sidebar behavior

- **Desktop:** the sidebar toggle button collapses it to an icon-only rail
  (`isCollapsed` signal) — labels hide, tooltips appear on hover, width
  transitions smoothly.
- **Mobile/tablet** (`BreakpointObserver` from `@angular/cdk/layout`): the
  sidebar switches to an overlay drawer (`mode="over"`) that opens/closes
  instead of collapsing, and auto-closes when you tap a nav link.

## Design tokens

Colors, spacing, radii, and shadows are defined as CSS custom properties in
`src/styles.scss` (`--color-primary`, `--sidebar-width-expanded`, etc.) plus a
custom Angular Material theme (indigo/teal) — adjust both in one place to
re-theme the app.

## Notes

- Angular Material's default `ng new` setup pulls Roboto + Material Icons
  from Google Fonts in `src/index.html`; production builds inline those fonts,
  which requires internet access at build time.
- Replace `AuthService` and `authGuard`'s mock logic with real API calls /
  token storage when you're ready to connect a backend.
