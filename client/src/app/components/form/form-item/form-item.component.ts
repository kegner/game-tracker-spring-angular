import { Component, EventEmitter, forwardRef, Input, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const FORM_ITEM_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormItemComponent),
  multi: true
};

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.css'],
  providers: [FORM_ITEM_VALUE_ACCESSOR]
})
export class FormItemComponent implements ControlValueAccessor {

  @Input() name!: string;
  @Input() label!: string;
  @Input() type: string = "text"
  @Input() isRequired: boolean = false;
  @Input() validClass: string = "";

  @Output() validClassChange: EventEmitter<string> = new EventEmitter<string>();

  formVal: string = "";

  onChange = (e: any) => {};
  onTouched = () => {};

  constructor() { }

  ngOnInit(): void {
  }

  writeValue(val: any): void {
    this.formVal = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onBlur() {
    if (this.isRequired) {
      this.validClass = !this.formVal ? "is-invalid" : "";
      this.validClassChange.emit(this.validClass);
    }
  }

}
