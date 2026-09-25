import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view-sa',
  standalone: true,
  imports: [],
  templateUrl: './user-view-sa.component.html',
  styleUrl: './user-view-sa.component.scss'
})
export class UserViewSaComponent {
  user: any
  constructor(
    private router: Router
  ){}
  editUser(user: any){
    if(!user){
      user ={id: 1}
    }
    let route = `/user/${user.id}/edit`
    this.router.navigate([route])
  }
}
