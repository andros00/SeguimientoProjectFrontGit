import { Component } from '@angular/core';
import { IProject } from 'src/app/core/interfaces/IProject';
import { ProjectSelectionService } from 'src/app/shared/services/project/project-selection/project-selection.service';

@Component({
  selector: 'app-formal-start-pages',
  templateUrl: './formal-start-pages.component.html',
  styleUrls: ['./formal-start-pages.component.scss']
})
export class FormalStartPagesComponent {
  project!: IProject | null;
  projectStatus!: string;
  projectShortName!: string;
  projectCode!: string;

  constructor(private projectSelectionService: ProjectSelectionService) { }

  ngOnInit() {
    this.projectSelectionService.selectedProject$.subscribe((project) => {
      if (project) {
        this.setProject(project);
        localStorage.setItem('selectedProject', JSON.stringify(project));
      }
    });

    if (!this.project) {
      const storedProject = localStorage.getItem('selectedProject');
      if (storedProject) {
        this.setProject(JSON.parse(storedProject));
      }
    }
  }

  private setProject(project: IProject) {
    this.project = project;
    this.projectStatus = project.estado || '';
    this.projectShortName = project.nombreCorto || '';
    this.projectCode = project.codigo || '';
  }
}
