/* import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  template: `
    <mat-form-field>
      <mat-label> {{ label }} </mat-label>
      <input matInput [matDatepicker]="picker" [value]="value" (dateChange)="onDateChanged($event)">
      <mat-datepicker-toggle matIconSuffix [for]="picker" *ngIf="!readonly"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  `,
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent {
  @Input() label!: string;
  @Input() value?: Date;
  @Input() readonly = false;
  @Output() dateChange = new EventEmitter<Date>();

  onDateChanged(event: any): void {
  this.dateChange.emit(event.value); // event.value debe ser Date
}

}
 */


import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <input matInput [matDatepicker]="picker" [value]="value" [readonly]="readonly" (dateChange)="onDateChanged($event)">
      <mat-datepicker-toggle
        matIconSuffix [for]="picker" *ngIf="!readonly">
      </mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  `,
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ]
})
export class DatepickerComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() readonly = false;

  value?: Date;

  // Métodos de ControlValueAccessor
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(date: Date | null): void {
    if (date instanceof Date) {
      this.value = date;
    } else if (date) {
      this.value = new Date(date);
    } else {
      this.value = undefined;
    }
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

  // Evento al cambiar fecha
  onDateChanged(event: any): void {
    const date: Date = event.value;
    this.value = date;
    this.onChange(date);
    this.onTouched();
  }
}
