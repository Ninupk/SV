import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewSaComponent } from './user-view-sa.component';

describe('UserViewSaComponent', () => {
  let component: UserViewSaComponent;
  let fixture: ComponentFixture<UserViewSaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserViewSaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
