import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-downlink-communication',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,

    MatDatepickerModule,
    MatNativeDateModule
  ],

  templateUrl: './downlink-communication.component.html',

  styleUrl: './downlink-communication.component.scss'
})


export class DownlinkCommunicationComponent {

  downlinkForm: FormGroup;


  constructor(private fb: FormBuilder) {

    /*
     * Create Form
     */
    this.downlinkForm = this.fb.group({

      deviceSelection: [
        'all',
        Validators.required
      ],

      deviceId: [
        ''
      ],

      fromDate: [
        ''
      ],

      toDate: [
        ''
      ],

      deviceType: [
        ''
      ],

      payload: [
        '',
        Validators.required
      ]

    });


    /*
     * Listen for Device Selection
     */
    this.downlinkForm
      .get('deviceSelection')
      ?.valueChanges
      .subscribe(value => {

        this.updateConditionalValidators(value);

      });

  }


  /*
   * Add / Remove validators depending
   * on selected device option
   */
  updateConditionalValidators(value: string): void {

    const deviceId = this.downlinkForm.get('deviceId');
    const fromDate = this.downlinkForm.get('fromDate');
    const toDate = this.downlinkForm.get('toDate');
    const deviceType = this.downlinkForm.get('deviceType');


    /*
     * Clear existing validators
     */
    deviceId?.clearValidators();
    fromDate?.clearValidators();
    toDate?.clearValidators();
    deviceType?.clearValidators();


    /*
     * Clear old values
     */
    deviceId?.setValue('', { emitEvent: false });
    fromDate?.setValue('', { emitEvent: false });
    toDate?.setValue('', { emitEvent: false });
    deviceType?.setValue('', { emitEvent: false });


    /*
     * Device ID selected
     */
    if (value === 'deviceId') {

      deviceId?.setValidators(
        Validators.required
      );

    }


    /*
     * Created Date selected
     */
    if (value === 'createdDate') {

      fromDate?.setValidators(
        Validators.required
      );

      toDate?.setValidators(
        Validators.required
      );

    }


    /*
     * Device Type selected
     */
    if (value === 'deviceType') {

      deviceType?.setValidators(
        Validators.required
      );

    }


    /*
     * Update validation state
     */
    deviceId?.updateValueAndValidity({
      emitEvent: false
    });

    fromDate?.updateValueAndValidity({
      emitEvent: false
    });

    toDate?.updateValueAndValidity({
      emitEvent: false
    });

    deviceType?.updateValueAndValidity({
      emitEvent: false
    });

  }


  /*
   * Save
   */
  onSave(): void {

    if (this.downlinkForm.invalid) {

      this.downlinkForm.markAllAsTouched();

      return;
    }


    console.log(
      'Downlink Form:',
      this.downlinkForm.value
    );

  }


  /*
   * Cancel
   */
  onCancel(): void {

    this.downlinkForm.reset({

      deviceSelection: 'all',

      deviceId: '',

      fromDate: '',

      toDate: '',

      deviceType: '',

      payload: ''

    });

  }

}