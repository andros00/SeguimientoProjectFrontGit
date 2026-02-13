import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slide-toggle',
  template: `
    <div class="toggle-container">
      <span>{{ label }}</span>
      <mat-slide-toggle 
        [(ngModel)]="isChecked" 
        (change)="onToggleChange($event)"
        [labelPosition]="labelPosition">
      </mat-slide-toggle>
    </div>`,
  styleUrls: ['./slide-toggle.component.scss']
})
export class SlideToggleComponent {

  @Input() label = '';
  @Input() labelPosition: 'before' | 'after' = 'before';

  isChecked = false;

  onToggleChange(event: any) {
    this.isChecked = event.checked;
  }
}
