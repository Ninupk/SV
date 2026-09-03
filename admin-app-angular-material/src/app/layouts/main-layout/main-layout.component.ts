import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../shared/modals/confirm-dialog/confirm-dialog.component';

interface NavChild {
  label: string;
  icon: string;
  route: string;
}

interface NavItem {
  label: string;
  icon: string;
  /** Leaf item — set a route to navigate directly. */
  route?: string;
  /** Group item — set children to render an expandable submenu instead. */
  children?: NavChild[];
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
    MatBadgeModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnDestroy {
  readonly currentYear = new Date().getFullYear();
  /** Sidebar visually collapsed to icon-only rail (desktop only). */
  readonly isCollapsed = signal(false);
  /** True on small viewports — sidenav becomes an overlay drawer. */
  readonly isMobile = signal(false);
  /** Drawer open state, relevant mainly on mobile ('over' mode). */
  readonly isDrawerOpen = signal(true);
  /** Labels of currently expanded group items. */
  private readonly expandedGroups = signal<ReadonlySet<string>>(new Set());

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'home', route: '/dashboard' },
    { label: 'User Management', icon: 'group',  route: '/user-list'},
    { label: 'Client Management', icon: 'account_tree', route: '/client-list' },
    { label: 'Role Management', icon: 'account_tree', route: '/role/role-list' },
    { label: 'Entity Management', icon: 'device_hub',
      children: [
        { label: 'Entity List', icon: 'category', route: '/entities/entity-list' },
        { label: 'Entity Types', icon: 'sell', route: '/entities/entity-type' },
      ],
    },
    { label: 'Device Management', icon: 'dns',
      children: [
        { label: 'Device List', icon: 'sensors', route: '/device-mngmt/device-list' },
        { label: 'Device Type', icon: 'memory', route: '/device-mngmt/device-type' },
        { label: 'Downlink Communication', icon: 'memory', route: '/device-mngmt/downlink-communication' },
        { label: 'OTA Updates', icon: 'memory', route: '/device-mngmt/ota-updates' },
      ],
    },
    { label: 'Dashboard Management', icon: 'speed', route: '/dashboard-mngmt' },
    { label: 'Alerts', icon: 'notifications', route: '/alerts' },
  ];

  private readonly breakpointSub: Subscription;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.breakpointSub = this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe((result) => {
        this.isMobile.set(result.matches);
        this.isDrawerOpen.set(!result.matches);
      });
  }

  get currentUser() {
    return this.authService.currentUser();
  }

  get sidenavMode(): 'over' | 'side' {
    return this.isMobile() ? 'over' : 'side';
  }

  toggleSidebar(): void {
    if (this.isMobile()) {
      this.isDrawerOpen.update((open) => !open);
    } else {
      this.isCollapsed.update((collapsed) => !collapsed);
    }
  }

  closeDrawerOnMobile(): void {
    if (this.isMobile()) {
      this.isDrawerOpen.set(false);
    }
  }

  isGroupExpanded(label: string): boolean {
    return this.expandedGroups().has(label);
  }

  toggleGroup(label: string): void {
    // Icon-only rail has nowhere to render a submenu — ignore toggles there.
    if (this.isCollapsed() && !this.isMobile()) {
      return;
    }

    this.expandedGroups.update((current) => {
      const next = new Set(current);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  confirmLogout(): void {
    const data: ConfirmDialogData = {
      title: 'Sign out',
      message: 'Are you sure you want to sign out of SensorVision?',
      confirmLabel: 'Sign out',
      cancelLabel: 'Cancel',
      tone: 'danger',
    };

    this.dialog
      .open(ConfirmDialogComponent, { width: '400px', data })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        }
      });
  }

  ngOnDestroy(): void {
    this.breakpointSub.unsubscribe();
  }
}
