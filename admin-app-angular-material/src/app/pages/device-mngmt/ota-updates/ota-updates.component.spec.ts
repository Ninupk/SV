import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtaUpdatesComponent } from './ota-updates.component';

describe('OtaUpdatesComponent', () => {
  let component: OtaUpdatesComponent;
  let fixture: ComponentFixture<OtaUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtaUpdatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtaUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
