import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GameService } from 'src/app/services/game.service';
import { PaginateService } from 'src/app/services/paginate.service';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})
export class GameTableComponent implements OnInit {

  gamesPages: Array<Array<Game>> = [[]];
  pageIndex: number = 0;
  itemsPerPage: number = 5;
  loading: boolean = false;
  user!: User;
  previousCount: number = 0;
  games!: Array<Game>;

  constructor(
    private authenticationService: AuthenticationService,
    private gameService: GameService,
    private paginateService: PaginateService
  ) { }

  ngOnInit(): void {
    this.authenticationService.observables.user$.subscribe(val => {
      this.user = val;
      if (this.user.id) {
        this.gameService.fetchGames(this.user.id);
      }
    });

    this.gameService.observables.loading$.subscribe(val => this.loading = val);
    this.gameService.observables.games$.subscribe(val => {
      this.games = val;
      if (this.previousCount === 0) {
        this.previousCount = this.games.length;
      } else {
        this.loadGames();
      }
      this.gamesPages = this.paginateService.paginate<Game>(this.games, this.itemsPerPage);
    });
  }

  loadGames() {
    if (this.previousCount < this.games.length) { // add a game
      this.pageIndex = Math.floor(Math.max(this.games.length - 1, 0) / this.itemsPerPage);
    } else if (this.previousCount > this.games.length) { // delete a game
      this.pageIndex = Math.min(Math.floor(Math.max(this.games.length - 1, 0) / this.itemsPerPage), this.pageIndex);
    }
    this.previousCount = this.games.length;
  }

  setIndex(val: number) {
    this.pageIndex = val;
  }
}
