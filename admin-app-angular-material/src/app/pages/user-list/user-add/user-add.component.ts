import { Component } from '@angular/core';
import { MatDialogContent } from "@angular/material/dialog";

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [MatDialogContent],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss'
})
export class UserAddComponent {
[x: string]: any;

}
