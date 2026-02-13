import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  template: `
    <div class="container">
      <span>{{ label }}</span>
      <mat-checkbox
        class="custom-checkbox"
        [(ngModel)]="checked"
        [labelPosition]="labelPosition">
      </mat-checkbox>
    </div>`,
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  checked = false;
  @Input() labelPosition: 'before' | 'after' = 'before';
  @Input() label: string = '';
}
