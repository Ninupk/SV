import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ConfirmDialogComponent,
  type ConfirmDialogData,
} from '../../shared/modals/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-client-list',
  standalone: true,
   imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule
],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
clients: CdkTableDataSourceInput<any>;
removeClient(_t71: any) {
throw new Error('Method not implemented.');
}
displayedColumns: any;

}
