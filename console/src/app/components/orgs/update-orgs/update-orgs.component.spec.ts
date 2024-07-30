import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrgsComponent } from './update-orgs.component';

describe('UpdateOrgsComponent', () => {
  let component: UpdateOrgsComponent;
  let fixture: ComponentFixture<UpdateOrgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOrgsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOrgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
