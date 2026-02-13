import { Component, Input } from '@angular/core';

/**
 * AlertComponent
 * 
 * This component displays an alert message with an optional icon. It is designed to
 * use Angular Material's `mat-card` and `mat-icon` components for styling.
 * 
 * Inputs:
 * - `label` (string): The text to display as the alert message (required).
 * - `icon` (string): The name of the Angular Material icon to display alongside the message (optional).
 * 
 * Usage Example:
 * <app-alert label="This is an alert" icon="warning"></app-alert>
 */
@Component({
  selector: 'app-alert',
  template: `
    <mat-card>
      <mat-icon class="alert-icon" *ngIf="icon">{{ icon }}</mat-icon>
      <span class="alert-label">{{ label }}</span>
    </mat-card>
  `,
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  /**
   * The text message to display in the alert.
   * This input is required and should be passed by the parent component.
   */
  @Input() label!: string;

  /**
   * The name of the Angular Material icon to display.
   * This input is optional; if not provided, no icon will be shown.
   */
  @Input() icon: string = '';
}
