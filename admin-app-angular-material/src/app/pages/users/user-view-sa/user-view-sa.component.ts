import { Component } from '@angular/core';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-user-view-sa',
  standalone: true,
   imports: [
    MatDialogContent, 
    MatDialogModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
  ],
  templateUrl: './user-view-sa.component.html',
  styleUrl: './user-view-sa.component.scss'
})
// export class UserViewSaComponent {
//   user: any
//   constructor(
//     private router: Router
//   ){}
//   editUser(user: any){
//     if(!user){
//       user ={id: 1}
//     }
//     let route = `/user/${user.id}/edit`
//     this.router.navigate([route])
//   }
// }

export class UserViewSaComponent {
  user = {
    firstName: 'John',
    lastName: '4432',
    email: 'john.doe1785393773168@example.com',
    phone: '',
    role: 'TestRole_7119',
    status: 'Awaiting Password Change',
  };

  editUser(user: any) { /* ... */ }
  cancel() { /* ... */ }
}
