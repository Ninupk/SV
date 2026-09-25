import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListSaComponent } from './user-list-sa.component';

describe('UserListSaComponent', () => {
  let component: UserListSaComponent;
  let fixture: ComponentFixture<UserListSaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListSaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
