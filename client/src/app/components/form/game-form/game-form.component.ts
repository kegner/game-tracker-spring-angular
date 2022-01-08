import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Game } from 'src/app/models/Game';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  user!: User;
  id: number | null = null;
  title: string = "";
  platform: string = "";
  startDate: Date | null = null;
  endDate: Date | null = null;
  status: string = "";
  hoursToComplete: number = 0;
  rating: number = 0;
  price: number = 0;
  selectedGame!: Game;
  saving: boolean = false;

  constructor(
    private gameService: GameService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authenticationService.observables.user$.subscribe(val => this.user = val);
    this.gameService.observables.selectedGame$.subscribe(val => {
      this.selectedGame = val;
      this.selectGame();
    });
    this.gameService.observables.saving$.subscribe(val => this.saving = val);
  }

  selectGame() {
    const game = this.selectedGame;
    
    this.id = game.id || null;
    this.title = game.title || "";
    this.platform = game.platform || "";
    this.startDate = game.startDate || null;
    this.endDate = game.endDate || null;
    this.status = game.status || "";
    this.hoursToComplete = game.hoursToComplete || 0;
    this.rating = game.rating || 0;
    this.price = game.price || 0;
  }

  onCreate(form: NgForm) {
    this.gameService.createGame(this.getGame(form, true));
  }

  onUpdate(form: NgForm) {
    this.gameService.updateGame(this.getGame(form, false));
  }

  private getGame(form: NgForm, isCreate: boolean): Game {
    return {
      id: !isCreate ? form.controls["id"].value : null,
      title: form.controls["title"].value,
      platform: form.controls["platform"].value,
      startDate: form.controls["startDate"].value,
      endDate: form.controls["endDate"].value,
      hoursToComplete: form.controls["hoursToComplete"].value,
      status: form.controls["status"].value,
      rating: form.controls["rating"].value,
      price: form.controls["price"].value,
      userId: this.user.id
    }
  }

}
