import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITask } from '../interfaces/task';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }


  postTask(payload: ITask): Observable<ITask> {
    return this.http.post<ITask>(`${environment.baseUrl}/tasks`, payload);
  }


  getTaskById(id: string): Observable<ITask> {
    return this.http.get<ITask>(`${environment.baseUrl}/tasks/${id}`);
  }

}