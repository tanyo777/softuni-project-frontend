import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private httpClient: HttpClient
    ) { }

  logoutUser() {
    this.cookieService.remove('token');
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  getUser() {
    const token = this.cookieService.get("token");
    return this.httpClient.get(`${environment.baseUrl}/dashboard`, {headers: { token }});
  }


  loginUser(email: string, password: string) {
    return this.httpClient.post(`${environment.baseUrl}/login`, {email, password});
  }
}
