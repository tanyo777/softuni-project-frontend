import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { matchValidator } from 'src/app/utils/validators/rePassword';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { QrcodeVerificationComponent } from '../qrcode-verification/qrcode-verification.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup = new FormGroup({
    fullName: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl("", [Validators.required, matchValidator("password")])

  })

  // hide/show password
  hide: boolean = true;

  // component loading
  loading: boolean;


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  closeSnackBar() {
    this._snackBar.dismiss();
  }

  constructor(
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private titleService: Title,
    private _matDialog: MatDialog
    ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.titleService.setTitle("Register");
  }

  submitRegisterForm() {
    if(this.registerForm.valid) {
      this.loading = true;
        const url = `${environment.baseUrl}/register`;


        this.httpClient.post(url, this.registerForm.value).subscribe({
          next: (response: any) => {

            console.log(response);
            if(response.error) {

              // if error show snackbar with the error message
              const error = response.error;
              this.openSnackBar(error, "close");
              setTimeout(() => {
                this.closeSnackBar();
              },1500);
            } else {
              // get jwt token from the server
              const token = response.token.token;
              
              // qrcode
              const qr = response.token.qrcode;

              const component = this._matDialog.open(QrcodeVerificationComponent);
              let instance = component.componentInstance.qrCode = qr;
              component.componentInstance.token = token;




              // after the qrcode token is verified

              
            }
            this.loading = false;
          },
          error: (errObject: object) => {
            this.loading = false;
          }
        });
    }
  }
}
