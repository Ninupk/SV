import { Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-entity-list',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './entity-list.component.html',
  styleUrl: './entity-list.component.scss'
})
export class EntityListComponent {

}
