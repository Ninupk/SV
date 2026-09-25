import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddSaComponent } from './user-add-sa.component';

describe('UserAddSaComponent', () => {
  let component: UserAddSaComponent;
  let fixture: ComponentFixture<UserAddSaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddSaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
