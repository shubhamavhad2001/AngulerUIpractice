import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrgsComponent } from './add-orgs.component';

describe('AddOrgsComponent', () => {
  let component: AddOrgsComponent;
  let fixture: ComponentFixture<AddOrgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrgsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
