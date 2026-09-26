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

import { Router } from '@angular/router';

import { ConfirmDialogComponent } from '../../../shared/modals/confirm-dialog/confirm-dialog.component';
import { UserAddSaComponent } from '../user-add-sa/user-add-sa.component';


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
  selector: 'app-user-list-sa',
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
    ConfirmDialogComponent
  ],
  templateUrl: './user-list-sa.component.html',
  styleUrl: './user-list-sa.component.scss'
})
export class UserListSaComponent {

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
  searchText = '';
  selectedRole = '';
  selectedStatus = '';

  roles = ['TestRole_7119', 'Test New Role', 'Company Admin'];
  statuses = ['Active', 'Awaiting Password Change'];
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
  constructor(
    private dialog: MatDialog,
    private router: Router,
  ) {}
  deleteUser(user: any){

  }
  impersonateUser(user: any){

  }
  viewUser(user: any){
    let route = `/user/${user.id}/view`
    this.router.navigate([route])
  }
  selectUser(user: any, event: any){

  }
  selectAll(event: any){

  }
  exportUsers(){

  }
  addUser(){
    const dialogRef = this.dialog.open(UserAddSaComponent, {
          width: '600px',
          maxWidth: '90vw',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('Dialog closed:', result);
    
          if (result) {
            // Refresh user list if required
          }
        });
  }
  clearFilters(){

  }
  applyFilters(){}
}
