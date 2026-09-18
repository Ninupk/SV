import { Component } from '@angular/core';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [
    MatDialogContent, 
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss'
})
export class UserViewComponent {
user: any;

}
