import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-secret-dialog',
  templateUrl: './login-secret-dialog.component.html',
  styleUrls: ['./login-secret-dialog.component.scss']
})
export class LoginSecretDialogComponent implements OnInit {


  token!: string;


  verificationForm = new FormGroup({
    secretKey: new FormControl("", [Validators.required, Validators.minLength(6)])
  });


  constructor(
    private cookieService: CookieService,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private matDialog: MatDialog
    ) { }

  ngOnInit(): void {
  }



  sendVerificationToken(): void {

    if(this.verificationForm.valid) {
      const secretKey = this.verificationForm.controls['secretKey'].value;

    this.userService.verify(secretKey, this.token).subscribe({
      next: (verified: any) => {
        console.log(verified);
        if(verified.verified) {
          this.afterVerified();
        } else {
          this._snackBar.open("Wront secret key!", "close");

          setTimeout(() => {
            this._snackBar.dismiss();
          }, 3000)
        }
      }
    })
    }
  }


  afterVerified(): void {

    // set expiry date
    const expiryDate: Date = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24);

    // save cookie
    this.cookieService.put('token', this.token, { expires: expiryDate });

    this.matDialog.closeAll();

    // navigate to dashboard
    this.router.navigate(['/dashboard']);
  }

}
