import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  selectedGame!: Game;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.observables.selectedGame$.subscribe(val => this.selectedGame = val);
  }

}
