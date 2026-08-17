import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from '../../core/services/role.service';
import { UserService } from '../../core/services/user.service';
import { User, UserInput, UserStatus } from '../../core/models/user.model';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../shared/modals/confirm-dialog/confirm-dialog.component';
import {
  UserFormDialogComponent,
  UserFormDialogData,
} from '../../shared/modals/user-form-dialog/user-form-dialog.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  readonly displayedColumns = ['select', 'name', 'email', 'createdAt', 'role', 'status', 'impersonate', 'actions'];
  readonly pageSizeOptions = [10, 25, 50];
  readonly statusOptions: UserStatus[] = ['Active', 'Awaiting Password Change', 'Suspended'];

  readonly searchTerm = signal('');
  readonly roleFilter = signal<string | null>(null);
  readonly statusFilter = signal<UserStatus | null>(null);
  readonly page = signal(0);
  readonly pageSize = signal(10);
  readonly selectedIds = signal<ReadonlySet<string>>(new Set());

  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  readonly roleService = inject(RoleService);
  readonly userService = inject(UserService);

  readonly filteredUsers = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const role = this.roleFilter();
    const status = this.statusFilter();

    return this.userService.users().filter((user) => {
      const matchesTerm =
        !term || user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term);
      const matchesRole = !role || user.role === role;
      const matchesStatus = !status || user.status === status;
      return matchesTerm && matchesRole && matchesStatus;
    });
  });

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filteredUsers().length / this.pageSize())));

  readonly pagedUsers = computed(() => {
    const start = this.page() * this.pageSize();
    return this.filteredUsers().slice(start, start + this.pageSize());
  });

  readonly allOnPageSelected = computed(() => {
    const paged = this.pagedUsers();
    return paged.length > 0 && paged.every((user) => this.selectedIds().has(user.id));
  });

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
    this.page.set(0);
  }

  onRoleFilterChange(value: string | null): void {
    this.roleFilter.set(value);
    this.page.set(0);
  }

  onStatusFilterChange(value: UserStatus | null): void {
    this.statusFilter.set(value);
    this.page.set(0);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.roleFilter.set(null);
    this.statusFilter.set(null);
    this.page.set(0);
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.page.set(0);
  }

  previousPage(): void {
    this.page.update((p) => Math.max(0, p - 1));
  }

  nextPage(): void {
    this.page.update((p) => Math.min(this.totalPages() - 1, p + 1));
  }

  toggleSelectAllOnPage(checked: boolean): void {
    this.selectedIds.update((current) => {
      const next = new Set(current);
      for (const user of this.pagedUsers()) {
        checked ? next.add(user.id) : next.delete(user.id);
      }
      return next;
    });
  }

  toggleSelect(id: string, checked: boolean): void {
    this.selectedIds.update((current) => {
      const next = new Set(current);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  }

  isSelected(id: string): boolean {
    return this.selectedIds().has(id);
  }

  statusClass(status: UserStatus): string {
    return 'status-text status-text--' + status.toLowerCase().replace(/\s+/g, '-');
  }

  openAddUser(): void {
    this.dialog
      .open<UserFormDialogComponent, UserFormDialogData, UserInput>(UserFormDialogComponent, {
        width: '480px',
        data: {},
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.userService.create(result);
          this.snackBar.open('User added.', 'Dismiss', { duration: 3000 });
        }
      });
  }

  openEditUser(user: User): void {
    this.dialog
      .open<UserFormDialogComponent, UserFormDialogData, UserInput>(UserFormDialogComponent, {
        width: '480px',
        data: { user },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.userService.update(user.id, result);
          this.snackBar.open('User updated.', 'Dismiss', { duration: 3000 });
        }
      });
  }

  deleteUser(user: User): void {
    const data: ConfirmDialogData = {
      title: `Remove ${user.name}?`,
      message: `This will revoke ${user.name}'s access. This action cannot be undone.`,
      confirmLabel: 'Remove',
      cancelLabel: 'Cancel',
      tone: 'danger',
    };

    this.dialog
      .open(ConfirmDialogComponent, { width: '420px', data })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.userService.delete(user.id);
        }
      });
  }

  impersonate(user: User): void {
    const data: ConfirmDialogData = {
      title: `Impersonate ${user.name}?`,
      message: `You'll be signed in as ${user.name} until you end the impersonation session.`,
      confirmLabel: 'Impersonate',
      cancelLabel: 'Cancel',
    };

    this.dialog
      .open(ConfirmDialogComponent, { width: '420px', data })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.snackBar.open(`Impersonating ${user.name}...`, 'Dismiss', { duration: 3000 });
        }
      });
  }

  exportUsers(): void {
    const rows = this.filteredUsers();
    const header = ['Name', 'Email', 'Profile Created', 'Role', 'Status'];
    const lines = rows.map((u) =>
      [u.name, u.email, u.createdAt.toISOString().slice(0, 10), u.role, u.status]
        .map((v) => `"${v.replace(/"/g, '""')}"`)
        .join(',')
    );
    const csv = [header.join(','), ...lines].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'users.csv';
    link.click();
    URL.revokeObjectURL(url);
  }
}
