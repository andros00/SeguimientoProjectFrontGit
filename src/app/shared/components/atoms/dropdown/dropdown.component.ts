import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownRequiredComponent } from '../dropdown-required/dropdown-required.component';

/**
 * DropdownComponent
 * 
 * A reusable dropdown component that allows users to select an option from a list.
 * This component is highly customizable and emits an event whenever the selected option changes.
 * 
 * Inputs:
 * - `label` (string): The label for the dropdown (default: 'Select an option').
 * - `id` (string): The unique identifier for the dropdown element (default: 'dropdown').
 * - `options` (array): An array of objects representing the options in the dropdown. Each option has a `value` and a `tag` (default: empty array).
 * - `dropdownClass` (string): Additional class(es) to apply to the dropdown element (optional).
 * - `optionClass` (string): Additional class(es) to apply to the option elements (optional).
 * 
 * Outputs:
 * - `selectionChange` (EventEmitter<string | number>): Emits the value of the selected option when it changes.
 * 
 * Usage Example:
 * <app-dropdown 
 *   label="Choose a fruit" 
 *   [options]="[{ value: 'apple', tag: 'Apple' }, { value: 'banana', tag: 'Banana' }]" 
 *   (selectionChange)="onSelectionChange($event)">
 * </app-dropdown>
 */
@Component({
  selector: 'app-dropdown',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>{{ label }}</mat-label>
      <mat-select [value]="value" (selectionChange)="onSelectionChange($event)">
        <mat-option [value]="null">--</mat-option>
        <mat-option *ngFor="let option of options" [value]="option.value">
          {{ option.tag }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
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
  onChange = (value: any) => { };
  onTouched = () => { };

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
