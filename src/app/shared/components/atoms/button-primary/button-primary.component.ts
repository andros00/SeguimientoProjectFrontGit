import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * ButtonPrimaryComponent
 * 
 * A reusable primary button component styled with Angular Material. 
 * This component supports customization through inputs and emits an event when clicked.
 * 
 * Inputs:
 * - `label` (string): The text displayed on the button (default: 'BUTTON').
 * - `icon` (string): The name of the Angular Material icon to display next to the label (optional).
 * - `type` (string): The HTML button type (default: 'button').
 * 
 * Outputs:
 * - `clicked` (EventEmitter<void>): Emits an event when the button is clicked.
 * 
 * Usage Example:
 * <app-button-primary 
 *   label="Save" 
 *   icon="save" 
 *   type="submit" 
 *   (clicked)="onSave()">
 * </app-button-primary>
 */
@Component({
  selector: 'app-button-primary',
  template: `
    <button mat-raised-button class="button-primary" [type]="type" (click)="onClick()">
      <span class="label">{{ label }}</span>
      <mat-icon *ngIf="icon" class="icon">{{ icon }}</mat-icon>
    </button>
  `,
  styleUrls: ['./button-primary.component.scss'],
})
export class ButtonPrimaryComponent {
  /**
   * The text displayed on the button.
   * Default: 'BUTTON'.
   */
  @Input() label: string = 'BUTTON';

  /**
   * The name of the Angular Material icon to display next to the label.
   * This input is optional; if not provided, no icon will be shown.
   */
  @Input() icon: string = '';

  /**
   * The HTML button type attribute.
   * Default: 'button'.
   * Examples: 'button', 'submit', 'reset'.
   */
  @Input() type: string = 'button';

  /**
   * Event emitted when the button is clicked.
   */
  @Output() clicked = new EventEmitter<void>();

  /**
   * Handles the button click event and emits the `clicked` output.
   */
  onClick(): void {
    this.clicked.emit();
  }
}
