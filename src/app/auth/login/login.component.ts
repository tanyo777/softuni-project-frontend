import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { LoginSecretDialogComponent } from './login-secret-dialog/login-secret-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // check if component is loading data
  loading: boolean;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  hide: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService,
    private _snackBar: MatSnackBar,
    private titleService: Title,
    private matDialog: MatDialog
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.titleService.setTitle('Login');
  }

  toggleShowPassword() {
    this.hide = !this.hide;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  closeSnackBar() {
    this._snackBar.dismiss();
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      this.loading = true;

      const { email, password } = this.loginForm.value;

      // login
      this.userService.loginUser(email, password).subscribe({
        next: (res: any) => {
          if (res.error) {
            // if error show snackbar with the error message
            const error = res.error;
            this.openSnackBar(error, 'close');
            setTimeout(() => {
              this.closeSnackBar();
            }, 1500);
          } else {
            // get jwt token from the server
            const token = res.token;

            const verificationDialog = this.matDialog.open(LoginSecretDialogComponent);
            const instance = verificationDialog.componentInstance
            instance.token = token;
           
          }

          this.loading = false;
        },
      });
    }
  }
}
