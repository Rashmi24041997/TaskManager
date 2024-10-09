import { Component } from '@angular/core';
import { Project } from '../../project';
import { ProjectsService } from '../../projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  projects: Project[] = [];
  /**
   *
   */
  constructor(private projectsService: ProjectsService) {

  }
  ngoninit() {
    this.projectsService.getAllProjects().subscribe((projects: Project[]): void => {
      this.projects = projects;
    });
  }

}
