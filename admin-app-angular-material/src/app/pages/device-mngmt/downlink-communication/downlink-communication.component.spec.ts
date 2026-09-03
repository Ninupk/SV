import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownlinkCommunicationComponent } from './downlink-communication.component';

describe('DownlinkCommunicationComponent', () => {
  let component: DownlinkCommunicationComponent;
  let fixture: ComponentFixture<DownlinkCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownlinkCommunicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownlinkCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
