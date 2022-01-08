import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GameService } from 'src/app/services/game.service';

import { GameTableComponent } from './game-table.component';

describe('GameTableComponent', () => {
  let component: GameTableComponent;
  let fixture: ComponentFixture<GameTableComponent>;
  let gameService: GameService;
  let authenticationService: AuthenticationService;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule.forRoot([])],
      declarations: [GameTableComponent],
      providers: [GameService, AuthenticationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    gameService = TestBed.inject(GameService);
    authenticationService = TestBed.inject(AuthenticationService);
    spy = spyOn(gameService, "fetchGames");
    fixture = TestBed.createComponent(GameTableComponent);
    component = fixture.componentInstance;
    authenticationService.setUserData({ id: 1, firstName: "Name" });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("fetches games", () => {
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
