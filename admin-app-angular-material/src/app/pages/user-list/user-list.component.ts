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
import { UserAddComponent } from './user-add/user-add.component';

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
    MatDialogModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
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
    'actions'
  ];

  users: User[] = [
    {
      id: 1,
      name: 'John 4432',
      email: 'john.doe1785393773168@example.com',
      profileCreated: '30 Jul 2026',
      role: 'TestRole_7119',
      status: 'Awaiting Password Change',
      impersonate: true
    },
    {
      id: 2,
      name: 'John 4936',
      email: 'john.doe1785316941920@example.com',
      profileCreated: '29 Jul 2026',
      role: 'Test New Role',
      status: 'Awaiting Password Change',
      impersonate: true
    },
    {
      id: 3,
      name: 'Shen Shan',
      email: 'shen@mailsac.com',
      profileCreated: '29 Oct 2025',
      role: 'Company Admin',
      status: 'Active',
      impersonate: false
    }
  ];

  dataSource = new MatTableDataSource<User>(this.users);

  searchText = '';
  selectedRole = '';
  selectedStatus = '';

  roles = [
    'TestRole_7119',
    'Test New Role',
    'Company Admin'
  ];

  statuses = [
    'Active',
    'Awaiting Password Change'
  ];

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

    const filtered = this.users.filter(user => {

      const matchesSearch =
        !search ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);

      const matchesRole =
        !this.selectedRole ||
        user.role === this.selectedRole;

      const matchesStatus =
        !this.selectedStatus ||
        user.status === this.selectedStatus;

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
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: '700px',
      maxWidth: '95vw',
      disableClose: false
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User added:', result);
      }
    });
  }

  exportUsers() {
    console.log('Export users');
  }

  impersonateUser(user: User) {
    console.log('Impersonate:', user);
  }

  deleteUser(user: User) {
    console.log('Delete:', user);
  }

  selectAll(event: any) {
    console.log('Select all:', event.checked);
  }

  selectUser(user: User, event: any) {
    console.log(user, event.checked);
  }
}