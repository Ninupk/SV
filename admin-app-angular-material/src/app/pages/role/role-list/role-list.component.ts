import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
}
@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    RouterLink, 
    MatCardModule,
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent {
  role: any;
  displayedColumns: string[] = [
      'slNo',
      'name',
      'description',
      'permissions',
      'actions'
    ];

    roles: Role[] = [
      {
        id: 1,
        name: 'Admin',
        description: 'System Administrator',
        permissions: ['Create', 'Edit', 'Delete', 'View']
      },
      {
        id: 2,
        name: 'Manager',
        description: 'Department Manager',
        permissions: ['Edit', 'View']
      },
      {
        id: 3,
        name: 'User',
        description: 'Standard User Access',
        permissions: ['View']
      }
    ];

    deleteRole(id: number): void {
      const confirmed = confirm('Are you sure you want to delete this role?');

      if (confirmed) {
        this.roles = this.roles.filter(role => role.id !== id);
      }
    }
}
