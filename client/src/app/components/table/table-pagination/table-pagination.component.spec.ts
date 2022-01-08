import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Game } from 'src/app/models/Game';

import { TablePaginationComponent } from './table-pagination.component';

describe('TablePaginationComponent', () => {
  let component: TablePaginationComponent;
  let fixture: ComponentFixture<TablePaginationComponent>;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePaginationComponent);
    component = fixture.componentInstance;
    component.gamesPages = [
      [
        { id: 1, title: "Game 1" },
        { id: 2, title: "Game 2" },
        { id: 3, title: "Game 3" },
        { id: 4, title: "Game 4" },
        { id: 5, title: "Game 5" },
      ],
      [
        { id: 6, title: "Game 6" }
      ]
    ];
    component.pageIndex = 0;
    spy = spyOn(component, "pageButtonHandler");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("has correct page count", () => {
    const pageCount = fixture.nativeElement.querySelectorAll("li").length;
    expect(pageCount).toBe(4);
  });

  it("selects a page", async () => {
    const button = fixture.nativeElement.querySelectorAll("button")[2];
    expect(spy).not.toHaveBeenCalled();
    button.click();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
