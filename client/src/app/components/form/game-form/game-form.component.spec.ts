import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GameFormComponent } from './game-form.component';

describe('GameFormComponent', () => {
  let component: GameFormComponent;
  let fixture: ComponentFixture<GameFormComponent>;
  let createSpy: any;
  let updateSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule.forRoot([]), FormsModule],
      declarations: [ GameFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFormComponent);
    component = fixture.componentInstance;
    createSpy = spyOn(component, "onCreate");
    updateSpy = spyOn(component, "onUpdate");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("create new game", async () => {
    component.title = "My title";
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelectorAll("button")[0];
    expect(createSpy).not.toHaveBeenCalled();
    button.click();
    expect(createSpy).toHaveBeenCalledTimes(1);
  });

  it("update game", async () => {
    component.id = 1;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelectorAll("button")[1];
    expect(updateSpy).not.toHaveBeenCalled();
    button.click();
    expect(updateSpy).toHaveBeenCalledTimes(1);
  });
});
