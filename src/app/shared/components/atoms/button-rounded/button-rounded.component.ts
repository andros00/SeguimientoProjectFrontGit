import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-rounded',
  template: `
    <button mat-fab matTooltip="Primary" color="primary">
      <mat-icon class="icon">{{ icon }}</mat-icon>
    </button>
  `,
  styleUrls: ['./button-rounded.component.scss']
})
export class ButtonRoundedComponent {
  /**
   * The name of the Angular Material icon to display next to the label.
   */
    @Input() icon: string = '';

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
