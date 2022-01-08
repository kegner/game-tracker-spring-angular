import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-item',
  templateUrl: './details-item.component.html',
  styleUrls: ['./details-item.component.css']
})
export class DetailsItemComponent implements OnInit {

  @Input() label: string = "";

  private _value: any;

  @Input()
  set value(val: any) {
    this._value = val;
    this.formatValue();
  }

  get value(): any {
    return this._value;
  }

  @Input() currency: boolean = false;

  formattedValue!: string;

  constructor() { }

  ngOnInit(): void {
  }
  
  formatValue() {
    const formatter = new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    });
  
    this.formattedValue = this.value;
    if (this.currency && this.value) {
      this.formattedValue = formatter.format(this.value);
    }
  }

}
