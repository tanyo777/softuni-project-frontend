import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantIconComponent } from './participant-icon.component';

describe('ParticipantIconComponent', () => {
  let component: ParticipantIconComponent;
  let fixture: ComponentFixture<ParticipantIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
