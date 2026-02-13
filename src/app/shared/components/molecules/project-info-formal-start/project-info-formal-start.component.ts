import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-info-formal-start',
  template: `
    <mat-card class="status-card">
      <mat-card-content>
        <div class="card-top">
          <span class="title"> {{ projectShortName }} </span><br>
        </div>  
        <div class="card-bottom">
          <span class="id">{{ projectCode }} - </span>
          <span class="approved">{{ projectStatus }}</span>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./project-info-formal-start.component.scss']
})
export class ProjectInfoFormalStartComponent {

  @Input() projectStatus: string = '';

  @Input() projectShortName: string = '';

  @Input() projectCode: string = '';

}
