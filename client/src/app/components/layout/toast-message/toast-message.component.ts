import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Toast } from 'src/app/models/Toast';
import { Toast as BSToast } from 'bootstrap';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.css']
})
export class ToastMessageComponent implements OnInit {

  private _toast!: Toast;

  @Input()
  set toast(val: Toast) {
    this._toast = val;
    if (this.toastEl) {
      this.bgClass = this.toast.isError ? "bg-danger" : "bg-success";
      this.onToastChange();
    }
  }

  get toast(): Toast {
    return this._toast;
  }

  @ViewChild("toastEl") toastEl!: ElementRef;
  bsToast!: BSToast;
  bgClass: string = "";

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.bgClass = this.toast.isError ? "bg-danger" : "bg-success";
  }

  ngAfterViewInit() {
    this.onToastChange();
  }

  hideHandler = () => {
    if (this.toast.id) {
      this.toastService.hideToast(this.toast.id);
    }
  }

  onToastChange() {
    this.bsToast = new BSToast(this.toastEl.nativeElement);
    this.bsToast.show();
    this.toastEl.nativeElement.removeEventListener('hidden.bs.toast', this.hideHandler);
    this.toastEl.nativeElement.addEventListener('hidden.bs.toast', this.hideHandler);
  }

  ngOnDestroy(): void {
    this.toastEl.nativeElement.removeEventListener('hidden.bs.toast', this.hideHandler);
  }

}
