import { Injectable } from '@angular/core';
import { Game } from '../models/Game';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Games } from '../models/Games';
import { ObservableState } from '../models/ObservableState';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly games = new ObservableState<Array<Game>>([]);
  private readonly selectedGame = new ObservableState<Game>({});
  private readonly loading = new ObservableState<boolean>(false);
  private readonly saving = new ObservableState<boolean>(false);
  
  private readonly _observables = {
    games$: this.games.value$,
    selectedGame$: this.selectedGame.value$,
    loading$: this.loading.value$,
    saving$: this.saving.value$
  }

  get observables() {
    return this._observables;
  }
  
  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  getCurrent() {
    return {
      games: this.games.value,
      selectedGame: this.selectedGame.value,
      loading: this.loading.value,
      saving: this.saving.value
    }
  }

  errorHandler(error: any) {
    const validResponses = [404, 409];
    if (error && error.error && validResponses.includes(error.status)) {
      this.toastService.showErrorToast(error.error.message);
    } else {
      console.error(error);
    }
  }

  selectGame(game: Game) {
    this.selectedGame.value = game;
  }

  fetchGames(userId: number) {
    this.startLoading();
    
    const params = new HttpParams().set("userId", userId);
    this.http.get<Games>("/api/v1/games", { params }).subscribe({
      next: res => {
        const selectedGame = res.games && res.games.length > 0 ? res.games[0] : {};
        this.games.value = res.games;
        this.selectedGame.value = selectedGame;
        this.loading.value = false;
      },
      error: error => {
        this.stopLoading();
        this.errorHandler(error);
      }
    });
  }

  createGame(game: Game) {
    this.startSaving();

    this.http.post<Game>("api/v1/games", game).subscribe({
      next: res => {
        this.games.value = [...this.games.value, res];
        this.selectedGame.value = res;
        this.saving.value = false;
        this.toastService.showSuccessToast("Game added.");
      },
      error: error => {
        this.stopSaving();
        this.errorHandler(error);
      }
    });
  }

  updateGame(game: Game) {
    this.startSaving();

    this.http.put<Game>("api/v1/games", game).subscribe({
      next: res => {
        const games = this.games.value.map(g => (
          g.id === res.id ? res : g
        ));

        this.games.value = games;
        this.selectedGame.value = res;
        this.saving.value = false;
        this.toastService.showSuccessToast("Game updated.");
      },
      error: error => {
        this.stopSaving();
        this.errorHandler(error);
      }
    });
  }

  deleteGame(id: number) {
    this.startSaving();

    this.http.delete(`api/v1/games/${id}`).subscribe({
      next: () => {
        const games = this.games.value.filter(game => game.id !== id);
        const selectedGame = games.length > 0 ? games[0] : {};

        this.games.value = games;
        this.selectedGame.value = selectedGame;
        this.saving.value = false;
        this.toastService.showSuccessToast("Game deleted.");
      },
      error: error => {
        this.stopSaving();
        this.errorHandler(error);
      }
    });
  }

  private startLoading() {
    this.loading.value = true;
  }

  private stopLoading() {
    this.loading.value = false;
  }

  private startSaving() {
    this.saving.value = true;
  }

  private stopSaving() {
    this.saving.value = false;
  }

}
