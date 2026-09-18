import { Component } from '@angular/core';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [MatDialogContent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss'
})
export class UserViewComponent {
user: any;

}
