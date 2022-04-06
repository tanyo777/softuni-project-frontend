import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuebtnComponent } from './issuebtn.component';

describe('IssuebtnComponent', () => {
  let component: IssuebtnComponent;
  let fixture: ComponentFixture<IssuebtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuebtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuebtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
