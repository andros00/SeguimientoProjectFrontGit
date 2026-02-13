import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown-required',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>{{ label }}</mat-label>
      <mat-select [value]="value" (selectionChange)="onSelectionChange($event)" required>
        <mat-option [value]="null">--</mat-option>
        <mat-option *ngFor="let option of options" [value]="option.value">
          {{ option.tag }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['./dropdown-required.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownRequiredComponent),
      multi: true,
    },
  ],
})
export class DropdownRequiredComponent implements ControlValueAccessor {
  /**
   * The label for the dropdown.
   */
  @Input() label: string = 'Select an option';

  /**
   * The unique identifier for the dropdown element.
   */
  @Input() id: string = 'dropdown';

  /**
   * An array of options to display in the dropdown.
   */
  @Input() options: { value: string | number; tag: string }[] = [];

  /**
   * Event emitted when the selected option changes.
   */
  @Output() selectionChange = new EventEmitter<string | number>();

  value: string | number | null = null;

  // Callbacks for ControlValueAccessor
  onChange = (value: any) => {};
  onTouched = () => {};

  /**
   * Writes a new value to the input field.
   * @param value The new value to set.
   */
  writeValue(value: any): void {
    this.value = value || null;
  }

  /**
   * Registers a function to call when the input value changes.
   * @param fn The callback function.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registers a function to call when the input is touched (blur event).
   * @param fn The callback function.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Handles the selection change event from the dropdown and emits the selected value.
   * @param event The change event triggered by the dropdown.
   */
  onSelectionChange(event: any): void {
    const value = event.value;
    this.value = value;
    this.onChange(value);
    this.selectionChange.emit(value);
  }
}
