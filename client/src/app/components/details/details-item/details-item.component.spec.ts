import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsItemComponent } from './details-item.component';

describe('DetailsItemComponent', () => {
  let component: DetailsItemComponent;
  let fixture: ComponentFixture<DetailsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("shows normal values", () => {
    component.label = "My item";
    component.currency = false;
    component.value = 12.34;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("strong")).toBeTruthy();
    expect(fixture.nativeElement.innerText).not.toContain("$12.34");
    expect(fixture.nativeElement.innerText).toContain("12.34");
  });

  it("shows currency values", () => {
    component.label = "My item";
    component.currency = true;
    component.value = 12.34;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("strong")).toBeTruthy();
    expect(fixture.nativeElement.innerText).toContain("$12.34");
  });
});
