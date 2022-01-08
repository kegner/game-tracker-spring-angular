import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Game } from 'src/app/models/Game';
import { ObservableState } from 'src/app/models/ObservableState';
import { GameService } from 'src/app/services/game.service';

import { TableCountComponent } from './table-count.component';

describe('TableCountComponent', () => {
  let component: TableCountComponent;
  let fixture: ComponentFixture<TableCountComponent>;
  let gameService: GameService;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ TableCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCountComponent);
    gameService = TestBed.inject(GameService);

    const state = new ObservableState<Array<Game>>([
      { id: 1, title: "Game 1" },
      { id: 2, title: "Game 2" }
    ]);

    const observables = {
      games$: state.value$
    }

    spyOnProperty(gameService, "observables", "get").and.returnValue(observables);
    component = fixture.componentInstance;
    component.pageIndex = 0;
    component.itemsPerPage = 5;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("has correct text", () => {
    expect(fixture.nativeElement.innerText).toBe("Showing 1 to 2 of 2");
  });
});
