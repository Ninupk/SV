import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserViewComponent } from './user-view/user-view.component';
import { ConfirmDialogComponent } from '../../shared/modals/confirm-dialog/confirm-dialog.component';
interface User {
  id: number;
  name: string;
  email: string;
  profileCreated: string;
  role: string;
  status: string;
  impersonate: boolean;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './users-list-view.component.html',
  styleUrl: './users-list-view.component.scss',
})
export class UserListComponent {
  displayedColumns: string[] = [
    'select',
    'name',
    'email',
    'profileCreated',
    'role',
    'status',
    'impersonate',
    'actions',
  ];

  users: User[] = [
    {
      id: 1,
      name: 'John 4432',
      email: 'john.doe1785393773168@example.com',
      profileCreated: '30 Jul 2026',
      role: 'TestRole_7119',
      status: 'Awaiting Password Change',
      impersonate: true,
    },
    {
      id: 2,
      name: 'John 4936',
      email: 'john.doe1785316941920@example.com',
      profileCreated: '29 Jul 2026',
      role: 'Test New Role',
      status: 'Awaiting Password Change',
      impersonate: true,
    },
    {
      id: 3,
      name: 'Shen Shan',
      email: 'shen@mailsac.com',
      profileCreated: '29 Oct 2025',
      role: 'Company Admin',
      status: 'Active',
      impersonate: false,
    },
    {
      id: 4,
      name: 'Abc Def',
      email: 'abc.def@example.com',
      profileCreated: '28 Oct 2025',
      role: 'Company Admin',
      status: 'Active',
      impersonate: false,
    },
    {
      id: 5,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      profileCreated: '25 Oct 2025',
      role: 'User',
      status: 'Active',
      impersonate: false,
    },
    {
      id: 6,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      profileCreated: '22 Oct 2025',
      role: 'Manager',
      status: 'Active',
      impersonate: false,
    },
    {
      id: 7,
      name: 'David Miller',
      email: 'david.miller@example.com',
      profileCreated: '20 Oct 2025',
      role: 'User',
      status: 'Active',
      impersonate: false,
    },
    {
      id: 8,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      profileCreated: '18 Oct 2025',
      role: 'Company Admin',
      status: 'Active',
      impersonate: false,
    },
    {
      id: 9,
      name: 'Robert Taylor',
      email: 'robert.taylor@example.com',
      profileCreated: '15 Oct 2025',
      role: 'User',
      status: 'Inactive',
      impersonate: false,
    },
    {
      id: 10,
      name: 'Jennifer Anderson',
      email: 'jennifer.anderson@example.com',
      profileCreated: '12 Oct 2025',
      role: 'Manager',
      status: 'Active',
      impersonate: false,
    },
    {
      id: 11,
      name: 'James Thomas',
      email: 'james.thomas@example.com',
      profileCreated: '10 Oct 2025',
      role: 'User',
      status: 'Awaiting Password Change',
      impersonate: true,
    },
    {
      id: 12,
      name: 'Lisa Martinez',
      email: 'lisa.martinez@example.com',
      profileCreated: '08 Oct 2025',
      role: 'User',
      status: 'Active',
      impersonate: false,
    },
  ];

  dataSource = new MatTableDataSource<User>(this.users);

  searchText = '';
  selectedRole = '';
  selectedStatus = '';

  roles = ['TestRole_7119', 'Test New Role', 'Company Admin'];

  statuses = ['Active', 'Awaiting Password Change'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dialog: MatDialog) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  searchUsers() {
    this.dataSource.filterPredicate = (user: User, filter: string) => {
      const value = filter.toLowerCase();

      return (
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
      );
    };

    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  applyFilters() {
    const search = this.searchText.toLowerCase();

    const filtered = this.users.filter((user) => {
      const matchesSearch =
        !search ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);

      const matchesRole = !this.selectedRole || user.role === this.selectedRole;

      const matchesStatus =
        !this.selectedStatus || user.status === this.selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });

    this.dataSource.data = filtered;

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  clearFilters() {
    this.searchText = '';
    this.selectedRole = '';
    this.selectedStatus = '';

    this.dataSource.data = this.users;

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  addUser() {
    console.log('Add user');
  }

  exportUsers() {
    console.log('Export users');
  }

  impersonateUser(user: User) {
    console.log('Impersonate:', user);
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      maxWidth: '95vw',
      disableClose: true,

      data: {
        title: 'Delete User',
        message: `Are you sure you want to delete "${user.name}"?`,
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        tone: 'danger',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('Deleting user:', user);

        // Your delete API call here
      }
    });
  }

  selectAll(event: any) {
    console.log('Select all:', event.checked);
  }

  selectUser(user: User, event: any) {
    console.log(user, event.checked);
  }
  
  viewUser(user: any): void {
    this.dialog.open(UserViewComponent, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: user
    });
  }
}