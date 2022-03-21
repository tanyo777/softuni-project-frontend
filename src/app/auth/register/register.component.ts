import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { matchValidator } from 'src/app/utils/validators/rePassword';
import { environment } from 'src/environments/environment';
import { CookieService } from "ngx-cookie";
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  registerForm = new FormGroup({
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

  constructor(
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private cookieService: CookieService,
    private router: Router,
    private titleService: Title
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
            if(response.error) {

              // if error show snackbar with the error message
              const error = response.error;
              this.openSnackBar(error, "close");
            } else {
              // get jwt token from the server
              const token = response.token.token;

              // save it in a cookie and localstorage
              // set expiry date
              this.cookieService.put('token', token);
              localStorage.setItem("token", token);

              // navigate to dashboard
              this.router.navigate(['/dashboard']);
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
