import { Component } from '@angular/core';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [
    MatDialogContent, 
    MatDialogModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss'
})
export class UserViewComponent {
  constructor(
    private router: Router
  ){}
  user: any;
  editUser(): void {
    // Logic to edit the user
    console.log("edit clicked")
    this.router.navigate(['/user-list/user-edit'])
    .then(success => {
      console.log('Navigation success:', success);
    })
    .catch(error => {
      console.error('Navigation error:', error);
    });
  }

}