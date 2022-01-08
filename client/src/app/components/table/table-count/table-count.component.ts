import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-table-count',
  templateUrl: './table-count.component.html',
  styleUrls: ['./table-count.component.css']
})
export class TableCountComponent implements OnInit {

  @Input() pageIndex!: number;
  @Input() itemsPerPage!: number;
  
  games: Array<Game> = [];
  startCount: number = 0;
  endCount: number = 0;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.observables.games$.subscribe(val => {
      this.games = val;
      this.calculateStartAndEnd();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.calculateStartAndEnd();
  }

  calculateStartAndEnd() {
    this.startCount = (this.pageIndex * this.itemsPerPage) + (this.games.length > 0 ? 1 : 0);
    this.endCount = Math.min(this.games.length, (this.pageIndex + 1) * this.itemsPerPage);
  }

}
