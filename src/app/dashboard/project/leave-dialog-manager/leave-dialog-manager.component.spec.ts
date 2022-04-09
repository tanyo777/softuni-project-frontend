import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDialogManagerComponent } from './leave-dialog-manager.component';

describe('LeaveDialogManagerComponent', () => {
  let component: LeaveDialogManagerComponent;
  let fixture: ComponentFixture<LeaveDialogManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveDialogManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveDialogManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
