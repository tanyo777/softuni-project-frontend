import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITask } from '../interfaces/task';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  postTask(payload: ITask): Observable<ITask> {
    return this.http.post<ITask>(`${environment.baseUrl}/tasks`, payload);
  }

  getTaskById(id: string): Observable<ITask> {
    return this.http.get<ITask>(`${environment.baseUrl}/tasks/${id}`);
  }

  deleteTaskById(id: string): Observable<object> {
    return this.http.delete(`${environment.baseUrl}/tasks/${id}`);
  }

  updateTaskStatus(id: string, status: string): Observable<object> {
    return this.http.post(`${environment.baseUrl}/task/status`, {
      id,
      status,
    });
  }
}
