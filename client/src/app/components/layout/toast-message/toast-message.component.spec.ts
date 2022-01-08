import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Toast } from 'src/app/models/Toast';

import { ToastMessageComponent } from './toast-message.component';

describe('ToastMessageComponent', () => {
  let component: ToastMessageComponent;
  let fixture: ComponentFixture<ToastMessageComponent>;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastMessageComponent);
    component = fixture.componentInstance;
    spy = spyOn(component, "hideHandler");
    const toast: Toast = { isError: false, message: "message" };
    component.toast = toast;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("toast initially shown", () => {
    const element = fixture.nativeElement.querySelector(".toast");
    expect(element.classList.contains("show")).toBeTruthy();
  });

  it("hide toast on hidden event", () => {
    const element = fixture.nativeElement.querySelector(".toast");
    expect(spy).not.toHaveBeenCalled();
    element.dispatchEvent(new CustomEvent("hidden.bs.toast"));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("hide toast on button click", async () => {
    const button = fixture.nativeElement.querySelector("button");
    expect(spy).not.toHaveBeenCalled();
    button.click();
    fixture.detectChanges();
    await new Promise(r => setTimeout(r, 50));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
