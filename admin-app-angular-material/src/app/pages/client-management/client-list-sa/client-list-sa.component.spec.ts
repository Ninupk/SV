import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListSaComponent } from './client-list-sa.component';

describe('ClientListSaComponent', () => {
  let component: ClientListSaComponent;
  let fixture: ComponentFixture<ClientListSaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientListSaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientListSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
