import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * InputTextComponent
 *
 * A reusable text input component that integrates seamlessly with Angular Reactive Forms
 * and also emits an event whenever the input value changes.
 *
 * Inputs:
 * - `label` (string): The label displayed next to the text input.
 * - `readonly` (boolean): Whether the input is read-only.
 *
 * Outputs:
 * - `selectionChange` (EventEmitter<string | number>): Emits the value of the input whenever it changes.
 */
@Component({
  selector: 'app-input-text',
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <input
        matInput
        [type]="type"
        [readonly]="readonly"
        [value]="value ?? ''"
        (input)="handleInput($event)">
    </mat-form-field>
  `,
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() readonly = false;
  @Input() value: any = '';

  @Output() valueChange = new EventEmitter<any>();

  // Métodos para ControlValueAccessor (Reactive Forms)
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(val: any): void {
    this.value = val ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }

  // Método común para ambos modos
  handleInput(event: Event): void {
    const rawValue = (event.target as HTMLInputElement).value;
    const parsedValue = this.type === 'number' && rawValue !== '' ? Number(rawValue) : rawValue;

    this.value = parsedValue;

    // Notificar a Reactive Forms
    this.onChange(parsedValue);
    this.onTouched();

    // Notificar a binding tradicional
    this.valueChange.emit(parsedValue);
  }
}
