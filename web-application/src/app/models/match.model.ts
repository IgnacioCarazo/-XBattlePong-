import { Binnacle } from "./binnacle.model";
import { Ship } from "./ship.model";
import { User } from "./user.model";

export class Match {
    // Atributos heredados de evento
    public number: number;
    public event_key: string;
    public event_code: number;
    public event_name: string;
    public initial_date: string;
    public final_date: string;
    public initial_time: string;
    public final_time: string;
    public board_columns: number;
    public board_rows: number;
    public country: string;
    public location: string;
    public multiplayer: number;
    public client_name: string;
    public shooting_time: number;
    public shipsAvailable: Ship[]; // Naves disponibles para colocar en el tablero
    // Atributos especificos de partida
    public match_id: number;
    public player1: string;
    public player2: string;
    public players: number;

    public player_1_ships: Ship[]; // Naves del jugador 1 dentro del tablero
    public player_2_ships: Ship[]; // Naves del jugador 2 dentro del tablero

    public p1_game_history: []; // Bitacora de disparo del jugador 1
    public p2_game_history: []; // Bitacora de disparip del jugador 2

    public latest_shot: []; // Posicion en el tablero del ultimo disparo realizado


  }