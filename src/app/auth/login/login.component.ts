import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // check if component is loading data
  loading: boolean;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  hide: boolean = true;

  constructor() {
    this.loading = false;
  }

  ngOnInit(): void {
  }

  toggleShowPassword() {
    this.hide = !this.hide;
  }

  submitLoginForm() {
    if(this.loginForm.valid) {
      this.loading = true;
      console.log(this.loginForm.value);
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }
  }

}
