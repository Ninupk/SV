import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

}