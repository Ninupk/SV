import { Component } from '@angular/core';
import { MatCardHeader, MatCard, MatCardTitle } from "@angular/material/card";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [MatCardHeader, MatCard, MatCardTitle, MatCardModule, MatFormFieldModule],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.scss'
})
export class AddRoleComponent {

}
