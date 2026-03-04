import {
  Component,
  forwardRef,
  Input,
  OnInit
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-dropdown-required',
  templateUrl: './dropdown-required.component.html',
  styleUrls: ['./dropdown-required.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownRequiredComponent),
      multi: true,
    },
  ],
})
export class DropdownRequiredComponent
  implements ControlValueAccessor, OnInit {

  @Input() label: string = 'Select an option';
  @Input() options: { value: string | number; tag: string }[] = [];

  inputControl = new FormControl('');
  filteredOptions$!: Observable<{ value: string | number; tag: string }[]>;

  private selectedValue: string | number | null = null;

  onChange = (value: any) => {};
  onTouched = () => {};

  ngOnInit(): void {
    this.filteredOptions$ = this.inputControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  writeValue(value: any): void {
    this.selectedValue = value;
    const selected = this.options.find(o => o.value === value);
    this.inputControl.setValue(selected ? selected.tag : '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onOptionSelected(event: any): void {
    const selectedTag = event.option.value;
    const selected = this.options.find(o => o.tag === selectedTag);

    if (selected) {
      this.selectedValue = selected.value;
      this.onChange(selected.value);
    }
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.tag.toLowerCase().includes(filterValue)
    );
  }
}
