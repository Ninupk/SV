import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditSaComponent } from './user-edit-sa.component';

describe('UserEditSaComponent', () => {
  let component: UserEditSaComponent;
  let fixture: ComponentFixture<UserEditSaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEditSaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEditSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
