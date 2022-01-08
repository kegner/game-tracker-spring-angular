import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent implements OnInit {

  @Input() id!: number | undefined;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  deleteHandler() {
    if (this.id !== undefined) {
      this.gameService.deleteGame(this.id);
    }
  }

}
