import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastService } from 'src/app/services/toast.service';

import { ToastMessageContainerComponent } from './toast-message-container.component';

describe('ToastMessageContainerComponent', () => {
  let component: ToastMessageContainerComponent;
  let fixture: ComponentFixture<ToastMessageContainerComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastMessageContainerComponent],
      providers: [ToastService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    toastService = TestBed.inject(ToastService);
    fixture = TestBed.createComponent(ToastMessageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows one toast', () => {
    let toasts = fixture.nativeElement.querySelectorAll('app-toast-message');
    expect(toasts.length).toBe(0);
    toastService.showSuccessToast("My toast");
    fixture.detectChanges();
    toasts = fixture.nativeElement.querySelectorAll('app-toast-message');
    expect(toasts.length).toBe(1);
  });
});
