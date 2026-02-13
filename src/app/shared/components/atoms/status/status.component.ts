import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status',
  template: `
    <div class="status-container">
      <div class="status-item" *ngFor="let item of statuses">
        <mat-icon [ngClass]="item.iconClass" class="status-icon">{{ item.icon }}</mat-icon>
        <span>{{ item.label }}</span>
      </div>
    </div>
  `,
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  @Input() statuses: { label: string; icon: string; iconClass: string }[] = [];
}
