import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../shared/modals/confirm-dialog/confirm-dialog.component';

interface StatCard {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
  icon: string;
}

interface ClientRow {
  name: string;
  company: string;
  devices: number;
  status: 'Active' | 'Inactive' | 'Pending';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly stats: StatCard[] = [
    { label: 'Total clients', value: '1,284', delta: '+4.2%', trend: 'up', icon: 'groups' },
    { label: 'Active devices', value: '3,902', delta: '+1.8%', trend: 'up', icon: 'sensors' },
    { label: 'Open alerts', value: '18', delta: '-6.1%', trend: 'down', icon: 'notifications_active' },
    { label: 'Monthly revenue', value: '$48.2k', delta: '+9.4%', trend: 'up', icon: 'payments' },
  ];

  readonly displayedColumns = ['name', 'company', 'devices', 'status', 'actions'];

  readonly clients: ClientRow[] = [
    { name: 'Ava Thompson', company: 'Northwind Traders', devices: 12, status: 'Active' },
    { name: 'Liam Chen', company: 'Contoso Ltd.', devices: 4, status: 'Pending' },
    { name: 'Sofia Alvarez', company: 'Globex Corp', devices: 27, status: 'Active' },
    { name: 'Noah Williams', company: 'Initech', devices: 0, status: 'Inactive' },
    { name: 'Maya Patel', company: 'Umbrella Inc.', devices: 9, status: 'Active' },
  ];

  constructor(private readonly dialog: MatDialog) {}

  removeClient(client: ClientRow): void {
    const data: ConfirmDialogData = {
      title: `Remove ${client.name}?`,
      message: `This will revoke access for ${client.name} at ${client.company}. This action cannot be undone.`,
      confirmLabel: 'Remove',
      cancelLabel: 'Cancel',
      tone: 'danger',
    };

    this.dialog.open(ConfirmDialogComponent, { width: '420px', data });
  }
}
