import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMngmtComponent } from './device-mngmt.component';

describe('DeviceMngmtComponent', () => {
  let component: DeviceMngmtComponent;
  let fixture: ComponentFixture<DeviceMngmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceMngmtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceMngmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
