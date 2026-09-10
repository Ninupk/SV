import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [RouterLink, MatCardModule],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent {
role: any;

}
