import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-edit-role',
  standalone: true,
   imports: [
    CommonModule,
    ReactiveFormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.scss'
})
export class EditRoleComponent {
  roleForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.roleForm = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      description: [
        ''
      ]

    });

  }


  saveRole(): void {

    if (this.roleForm.invalid) {

      this.roleForm.markAllAsTouched();

      return;
    }

    console.log('Role Data:', this.roleForm.value);

  }
}
