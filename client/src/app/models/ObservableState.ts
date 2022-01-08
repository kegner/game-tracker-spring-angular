import { BehaviorSubject } from "rxjs";

export class ObservableState<T> {

  private readonly _value!: BehaviorSubject<T>;
  readonly value$;

  get value(): T {
    return this._value.getValue();
  }

  set value(value: T) {
    this._value.next(value);
  }

  constructor(initialValue: T) {
    this._value = new BehaviorSubject<T>(initialValue);
    this.value$ = this._value.asObservable();
  }
}