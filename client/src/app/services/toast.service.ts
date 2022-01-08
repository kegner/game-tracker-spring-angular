import { Injectable } from '@angular/core';
import { ObservableState } from '../models/ObservableState';
import { Toast } from '../models/Toast';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private readonly toasts = new ObservableState<Array<Toast>>([]);
 
  readonly observables = {
    toasts$: this.toasts.value$
  }

  showSuccessToast(message: string) {
    this.showToast(false, message);
  }

  showErrorToast(message: string) {
    this.showToast(true, message);
  }

  hideToast(id: string) {
    this.toasts.value = this.toasts.value.filter(toast => toast.id !== id);
  }

  private showToast(isError: boolean, message: string) {
    const newToast = {
      id: v4(),
      isError,
      message
    };
    
    this.toasts.value = [...this.toasts.value, newToast];
  }

}
