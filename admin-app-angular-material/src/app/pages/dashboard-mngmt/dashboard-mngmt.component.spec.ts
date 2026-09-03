import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMngmtComponent } from './dashboard-mngmt.component';

describe('DashboardMngmtComponent', () => {
  let component: DashboardMngmtComponent;
  let fixture: ComponentFixture<DashboardMngmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMngmtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMngmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
