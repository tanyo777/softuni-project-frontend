import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSecretDialogComponent } from './login-secret-dialog.component';

describe('LoginSecretDialogComponent', () => {
  let component: LoginSecretDialogComponent;
  let fixture: ComponentFixture<LoginSecretDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSecretDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSecretDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
