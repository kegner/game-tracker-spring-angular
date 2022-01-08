import { Component, OnInit } from '@angular/core';
import { Toast } from 'src/app/models/Toast';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast-message-container',
  templateUrl: './toast-message-container.component.html',
  styleUrls: ['./toast-message-container.component.css']
})
export class ToastMessageContainerComponent implements OnInit {

  toasts!: Array<Toast>;

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.observables.toasts$.subscribe(val => this.toasts = val);
  }

}
