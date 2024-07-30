import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDevicesComponent } from './update-devices.component';

describe('UpdateDevicesComponent', () => {
  let component: UpdateDevicesComponent;
  let fixture: ComponentFixture<UpdateDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDevicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
