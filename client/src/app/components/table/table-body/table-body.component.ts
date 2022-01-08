import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'tbody[app-table-body]',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.css']
})
export class TableBodyComponent implements OnInit {

  @Input() gamesPages!: Array<Array<Game>>;
  @Input() pageIndex!: number;

  selectedGame!: Game;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.observables.selectedGame$.subscribe(val => this.selectedGame = val);
  }
  
  rowClickHandler(game: Game) {
    this.gameService.selectGame(game);
  }

}
