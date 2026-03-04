import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent
  implements ControlValueAccessor, OnInit, OnChanges {

  @Input() label: string = 'Select an option';
  @Input() id: string = 'dropdown';
  @Input() options: { value: string | number; tag: string }[] = [];

  @Output() selectionChange = new EventEmitter<string | number>();

  inputControl = new FormControl('');
  filteredOptions$!: Observable<{ value: string | number; tag: string }[]>;

  private selectedValue: string | number | null = null;

  onChange = (value: any) => {};
  onTouched = () => {};

  ngOnInit(): void {
    this.initializeFilter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.initializeFilter();
    }
  }

  writeValue(value: any): void {
    this.selectedValue = value;
    const selected = this.options.find(o => o.value === value);
    this.inputControl.setValue(selected ? selected.tag : '', { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onOptionSelected(option: { value: string | number; tag: string }): void {
    this.selectedValue = option.value;
    this.inputControl.setValue(option.tag, { emitEvent: false });

    this.onChange(option.value);
    this.selectionChange.emit(option.value);
  }

  private initializeFilter(): void {
    this.filteredOptions$ = this.inputControl.valueChanges.pipe(
      startWith(this.inputControl.value || ''),
      map(value => this.filterOptions(value || ''))
    );
  }

  private filterOptions(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.tag.toLowerCase().includes(filterValue)
    );
  }
}
