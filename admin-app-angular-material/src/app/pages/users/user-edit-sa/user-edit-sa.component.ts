import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogContent } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MatChipsModule, MatChipSet, MatChip } from '@angular/material/chips';
import { MatDividerModule, MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-user-edit-sa',
  standalone: true,
 imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatDialogContent,
    CommonModule,
    MatCardModule,
    MatIcon,
    MatDivider,
    MatChipSet,
    MatChip
],
  templateUrl: './user-edit-sa.component.html',
  styleUrl: './user-edit-sa.component.scss'
})
export class UserEditSaComponent {

  userForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    // private dialogRef: MatDialogRef<UserEditComponent>,
  ) {
    this.createForm();
  }

  createForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [''],
      role: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    // API call will be Edited here
    this.saveUser();
  }

  saveUser(): void {
    // TODO: Add API call
  }

  resetForm(): void {
    this.userForm.reset();
  }
  
  cancel(): void {
    // this.dialogRef.close();
  }

}
