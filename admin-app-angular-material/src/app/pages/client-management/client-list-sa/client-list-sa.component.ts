import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

interface ClientRow {
  name: string;
  address: string;
  website: string;
  createdOn: string;
  status: 'Active' | 'Inactive';
  /** Which icon button sits before "Edit" in the Actions column. */
  quickAction: 'view' | 'suspend';
}

@Component({
  selector: 'app-client-list-sa',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
  ],
  templateUrl: './client-list-sa.component.html',
  styleUrl: './client-list-sa.component.scss'
})
export class ClientListSaComponent {
 readonly displayedColumns = ['select', 'name', 'address', 'website', 'createdOn', 'status', 'actions', 'delete'];

  readonly clients: ClientRow[] = [
    { name: 'Acme Technologies', address: 'Kozhikode, Kerala, India', website: 'example.com', createdOn: '15 Oct 2026', status: 'Active', quickAction: 'view' },
    { name: 'Bright Solutions', address: 'Kochi, Kerala, India', website: 'example.org', createdOn: '10 Oct 2026', status: 'Active', quickAction: 'suspend' },
    { name: 'Nova Systems', address: 'Bengaluru, Karnataka, India', website: 'example.net', createdOn: '05 Oct 2026', status: 'Inactive', quickAction: 'view' },
  ];
}
