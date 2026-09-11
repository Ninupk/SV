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
  selector: 'app-add-role',
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

  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.scss'
})
export class AddRoleComponent {

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