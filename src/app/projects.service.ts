import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  urlPrefix = 'http://localhost:7013';
  constructor(private httpClient: HttpClient) {
  }
  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.urlPrefix + "/api/projects");
  }
}
