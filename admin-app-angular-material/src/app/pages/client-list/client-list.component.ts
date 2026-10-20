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
import type { CdkTableDataSourceInput } from '@angular/cdk/table';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
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
    MatTooltipModule,
    MatOption,
    MatSelect,
    MatCheckbox
],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
deleteClient(_t140: any) {
throw new Error('Method not implemented.');
}
filteredClients() {
throw new Error('Method not implemented.');
}
deleteSelected() {
throw new Error('Method not implemented.');
}
toggleStatus(_t112: any) {
throw new Error('Method not implemented.');
}
openEditClient(_t112: any) {
throw new Error('Method not implemented.');
}
toggleSelect(arg0: any,arg1: boolean) {
throw new Error('Method not implemented.');
}
isSelected(arg0: any): unknown {
throw new Error('Method not implemented.');
}
toggleSelectAllOnPage(arg0: any) {
throw new Error('Method not implemented.');
}
pagedClients(): CdkTableDataSourceInput<any> {
throw new Error('Method not implemented.');
}
allOnPageSelected() {
throw new Error('Method not implemented.');
}
searchTerm() {
throw new Error('Method not implemented.');
}
onSearchChange(arg0: any) {
throw new Error('Method not implemented.');
}
selectedCount() {
throw new Error('Method not implemented.');
}
clearFilters() {
throw new Error('Method not implemented.');
}
statusOptions: any;
onStatusChange(arg0: any) {
throw new Error('Method not implemented.');
}
statusFilter() {
throw new Error('Method not implemented.');
}
goToPage(_t168: any) {
throw new Error('Method not implemented.');
}
page() {
throw new Error('Method not implemented.');
}
nextPage() {
throw new Error('Method not implemented.');
}
totalPages() {
throw new Error('Method not implemented.');
}
clients: CdkTableDataSourceInput<any> | undefined;
removeClient(_t71: any) {
throw new Error('Method not implemented.');
}
displayedColumns: any;

}
