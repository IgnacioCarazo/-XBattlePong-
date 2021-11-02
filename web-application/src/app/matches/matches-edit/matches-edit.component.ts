import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Binnacle } from 'src/app/models/binnacle.model';
import { ClassEvent } from 'src/app/models/event.model';
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
    });
    if (this.event.multiplayer == 0) {
      this.mode = 'Un solo jugador';
    }
    if (this.event.multiplayer == 1) {
      this.mode = 'Multijugador';
    }
  }

  /**
   * @name onSubmit()
   * @description Depending if its edit mode or add new song mode it will update or add the current song.
   */
  onSubmit() {
    if (this.matchForm.value.multiplayer) {
      this.matchForm.value.multiplayer = 1;
    } else {
      this.matchForm.value.multiplayer = 0;
    }
    if (this.editMode) {
      //this.dataStorageService.updateCancion(this.cancionForm.value);
    } else {
      //this.dataStorageService.storeSong(this.cancionForm.value);
    }
    //this.dataStorageService.storeEvent(this.matchForm.value);
    //this.matchService.addMatch(this.matchForm.value);
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
    let number = 0;
    let event_key = '';
    let event_code = '';
    let event_name = '';
    let initial_date = '';
    let final_date = '';
    let initial_time = '';
    let final_time = '';
    let board_columns = 10;
    let board_rows = 10;
    let country = '';
    let location = '';
    let multiplayer = false;
    let client_name = '';
    let shooting_time = 10;

    let match_id = 0;
    let player1 = '';
    let player2 = '';
    let players = 0;
    let player_1_ships = []; // Naves del jugador 1 dentro del tablero
    let player_2_ships = []; // Naves del jugador 2 dentro del tablero
    let p1_game_history = []; // Bitacora de disparo del jugador 1
    let p2_game_history = []; // Bitacora de disparip del jugador 2
    let latest_shot = []; // Posicion en el tablero del ultimo disparo realizado

    if (this.editMode) {
      const match = this.matchService.getMatch(this.id);
      number = match.number;
      event_key = match.event_key;
      event_code = match.event_code.toString();
      event_name = match.event_name;
      initial_date = match.initial_date;
      final_date = match.final_date;
      initial_time = match.initial_time;
      final_time = match.final_time;
      board_columns = match.board_columns;
      board_rows = match.board_rows;
      country = match.country;
      location = match.location;
      if (match.multiplayer == 1) {
        multiplayer = true;
      } else {
        multiplayer = false;
      }
      client_name = match.client_name;
      shooting_time = match.shooting_time;

      match_id = match.match_id;
      player1 = match.player1;
      player2 = match.player2;
      players = match.players;
      player_1_ships = match.player_1_ships;
      player_2_ships = match.player_2_ships;
      p1_game_history = match.p1_game_history;
      p2_game_history = match.p2_game_history;
      latest_shot = match.latest_shot;
    }

    this.matchForm = new FormGroup({
      number: new FormControl(number),
      event_name: new FormControl(event_name),
      event_code: new FormControl(event_code),
      event_key: new FormControl(event_key),
      initial_date: new FormControl(initial_date),
      final_date: new FormControl(final_date),
      initial_time: new FormControl(initial_time),
      final_time: new FormControl(final_time),
      board_columns: new FormControl(board_columns),
      board_rows: new FormControl(board_rows),
      country: new FormControl(country),
      location: new FormControl(location),
      multiplayer: new FormControl(multiplayer),
      client_name: new FormControl(client_name),
      shooting_time: new FormControl(shooting_time),
      match_id: new FormControl(match_id),

      player1: new FormControl(player1),
      player2: new FormControl(player2),
      players: new FormControl(players),
      player_1_ships: new FormControl(player_1_ships, Validators.required),
      player_2_ships: new FormControl(player_2_ships),
      p1_game_history: new FormControl(p1_game_history),
      p2_game_history: new FormControl(p2_game_history),
      latest_shot: new FormControl(latest_shot),
    });
  }
}
