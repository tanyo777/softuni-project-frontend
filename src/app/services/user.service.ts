import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user';

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

  editUserProperty() {

  }

  getUser(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.baseUrl}/dashboard`);
  }


  loginUser(email: string, password: string): Observable<object> {
    return this.httpClient.post(`${environment.baseUrl}/login`, {email, password});
  }

  inviteUser(email: string, projectId: string): Observable<object> {
    return this.httpClient.post(`${environment.baseUrl}/user/invite`, { email, projectId });
  }
}
