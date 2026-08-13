import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/modals/confirm-dialog/confirm-dialog.component';
// import { UserService } from '../../../core/services/user.service';
// import { User } from '../../../core/models/user.model';

interface ConfirmDialogData {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  tone: 'danger' | 'default';
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  readonly displayedColumns = ['name', 'email', 'role', 'status', 'actions'];

  constructor(
    // readonly userService: UserService,
    private readonly dialog: MatDialog
  ) {}

  deleteUser(user: any): void {
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
          // this.userService.delete(user.id);
        }
      });
  }
}