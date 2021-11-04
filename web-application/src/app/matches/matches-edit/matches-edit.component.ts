import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Binnacle } from 'src/app/models/binnacle.model';
import { ClassEvent } from 'src/app/models/event.model';
import { Match } from 'src/app/models/match.model';
import { EventService } from 'src/app/services/event.service';
import { MatchService } from 'src/app/services/match.service';
import { UserService } from 'src/app/services/user.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-matches-edit',
  templateUrl: './matches-edit.component.html',
  styleUrls: ['./matches-edit.component.css'],
})
export class MatchesEditComponent implements OnInit {
  id: number;
  editMode = false;
  matchForm: FormGroup;
  event: ClassEvent;
  mode = '';
  matches: Match[];

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService,
    private router: Router,
    private dataStorageService: DataStorageService,
    private userService: UserService,
    private eventService: EventService
  ) {
    this.event = eventService.getCurrentEvent();

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();

      if (this.event.multiplayer == 0) {
        this.mode = 'Un solo jugador';
      }
      if (this.event.multiplayer == 1) {
        this.mode = 'Multijugador';
      }
    });
  }

  /**
   * @name onSubmit()
   * @description Depending if its edit mode or add new song mode it will update or add the current song.
   */
  onSubmit() {
    if (this.editMode) {
      //this.dataStorageService.updateCancion(this.cancionForm.value);
    } else {
      //this.dataStorageService.storeSong(this.cancionForm.value);
    }
    console.log(this.matchForm.value)
    this.dataStorageService.storeMatch(this.matchForm.value);
    this.dataStorageService.fetchMatches(this.event.event_key).
    subscribe( matches => {
        this.matches = matches;
        this.matchService.setMatches(this.matches);
    });
    this.dataStorageService.fetchMatches(this.event.event_key).
    subscribe( matches => {
        this.matches = matches;
        this.matchService.setMatches(this.matches);
    });
    this.onCancel();
  }

  /**
   * @name onCancel()
   * @description Returns the link to its previous link.
   */
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  /**
   * @name initForm()
   * @description If it's edit mode it will load the inputs of the form with the preexistent values of the song. Otherwise
   * it will just set thes values 'empty' for the user to fill.
   */
  private initForm() {
    let event_key = this.event.event_key;
    let match_id = 0;
    let player1 = 'nachocarazo18@gmail.com';
    let player2 = '';
    let players = 0;
    let player_1_ships = []; // Naves del jugador 1 dentro del tablero
    let player_2_ships = []; // Naves del jugador 2 dentro del tablero
    let p1_game_history = 0; // Bitacora de disparo del jugador 1
    let p2_game_history = 0; // Bitacora de disparo del jugador 2

    if (this.editMode) {
      const match = this.matchService.getMatch(this.id);
      event_key = match.event_key;

      match_id = match.match_id;
      player1 = match.player1;
      player2 = match.player2;
      players = match.players;
      player_1_ships = match.player_1_ships;
      player_2_ships = match.player_2_ships;
      p1_game_history = match.p1_game_history;
      p2_game_history = match.p2_game_history;
    }

    this.matchForm = new FormGroup({
      event_key: new FormControl(event_key),

      match_id: new FormControl(match_id),

      player1: new FormControl(player1),
      player2: new FormControl(player2),
      players: new FormControl(players),
      player_1_ships: new FormControl(player_1_ships),
      player_2_ships: new FormControl(player_2_ships),
      p1_game_history: new FormControl(p1_game_history),
      p2_game_history: new FormControl(p2_game_history),
    });
  }
}
