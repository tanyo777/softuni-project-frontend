import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchValidator } from 'src/app/utils/validators/rePassword';


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

  hide: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  submitRegisterForm() {
    if(this.registerForm.valid) {
        console.log(this.registerForm.value);

        // send request to the API
        // redirect if the request succeeds
    }
  }
}
