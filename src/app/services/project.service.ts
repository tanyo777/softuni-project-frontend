import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProject } from '../interfaces/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }


  postProject(payload: IProject): Observable<IProject> {
    return this.http.post<IProject>(`${environment.baseUrl}/projects`, payload);
  }

  getProjectById(id: string): Observable<IProject> {
    return this.http.get<IProject>(`${environment.baseUrl}/projects/${id}`);
  }

}
