import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { Game } from 'src/app/models/Game';

import { TableBodyComponent } from './table-body.component';

describe('TableBodyComponent', () => {
  let component: TableBodyComponent;
  let fixture: ComponentFixture<TableBodyComponent>;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule],
      declarations: [ TableBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBodyComponent);
    component = fixture.componentInstance;
    spy = spyOn(component, "rowClickHandler");
    const gamesPages = [
      [{ id: 123, title: "My Game" }]
    ];
    component.gamesPages = gamesPages;
    component.pageIndex = 0;
    component.selectedGame = { id: 1 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("has the correct row count", () => {
    const rowCount = fixture.nativeElement.querySelectorAll("tr").length;
    expect(rowCount).toBe(1);
  });

  it("selects a row", () => {
    const rowElement = fixture.nativeElement.querySelector("tr");
    expect(spy).not.toHaveBeenCalled();
    rowElement.click(rowElement);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
