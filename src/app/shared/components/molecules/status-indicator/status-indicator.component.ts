import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-indicator',
  template: `
    <div class='container'>
      <p>
        Proyectos encontrados: <strong> {{ projectsNumber }} </strong>
      </p>
      <app-status [statuses]="[ ]" />
    </div>
  `,
  styleUrls: ['./status-indicator.component.scss']
})
export class StatusIndicatorComponent {
  @Input() projectsNumber: number = 0;
}
