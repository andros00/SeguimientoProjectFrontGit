import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProject } from 'src/app/core/interfaces/IProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectSelectionService {
  private selectedProjectSource = new BehaviorSubject<IProject | null>(null);
  selectedProject$ = this.selectedProjectSource.asObservable();

  selectProject(project: IProject) {
    this.selectedProjectSource.next(project);
  }
}
