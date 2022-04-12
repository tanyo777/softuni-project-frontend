import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeVerificationComponent } from './qrcode-verification.component';

describe('QrcodeVerificationComponent', () => {
  let component: QrcodeVerificationComponent;
  let fixture: ComponentFixture<QrcodeVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrcodeVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
