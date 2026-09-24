import { Component } from '@angular/core';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

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
user: any;

}