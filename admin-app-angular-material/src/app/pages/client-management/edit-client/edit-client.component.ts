
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';




@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss'
})
export class EditClientComponent {
private fb = inject(FormBuilder);

clientForm = this.fb.group({
  name: ['', Validators.required],

  street: ['', Validators.required],
  country: ['', Validators.required],
  state: ['', Validators.required],
  city: ['', Validators.required],
  zipCode: [''],

  currentCost: [null as number | null, Validators.required],
  maxDevices: [null as number | null, Validators.required],
  maxUsers: [null as number | null, Validators.required],

  website: [
    '',
    [
      Validators.required,
      Validators.pattern(/^https?:\/\/.+\..+/i)
    ]
  ],

  latitude: [''],
  longitude: [''],

  adminName: ['', Validators.required],
  adminEmail: ['', [Validators.required, Validators.email]],
  adminPhone: ['']
});

  // Sample dropdown data; replace with your actual options.
  countries = ['India', 'United States', 'United Kingdom', 'Australia'];

  states = ['Kerala', 'Karnataka', 'Tamil Nadu', 'Maharashtra'];

  cities = ['Kozhikode', 'Kochi', 'Kannur', 'Thiruvananthapuram'];

  saveClient(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    // Local-only demonstration. No backend/API call.
    console.log('Client form data:', this.clientForm.getRawValue());
    alert('Client details saved locally for demonstration.');
  }

  cancelForm(): void {
    this.clientForm.reset();
  }

  selectLocation(): void {
    // Add a map dialog or map picker here when required.
    alert('Location picker can be added here.');
  }

}
