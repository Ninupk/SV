import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  private readonly fb = inject(FormBuilder);

  readonly isSubmitting = signal(false);
  readonly isSent = signal(false);
  readonly sentToEmail = signal('');

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private readonly authService: AuthService) {}

  submit(): void {
    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const email = this.form.getRawValue().email!;

    this.authService.sendPasswordReset(email).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.sentToEmail.set(email);
        this.isSent.set(true);
      },
      error: () => {
        this.isSubmitting.set(false);
      },
    });
  }

  tryAnotherEmail(): void {
    this.isSent.set(false);
    this.form.reset();
  }
}
