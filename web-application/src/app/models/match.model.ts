import { Binnacle } from "./binnacle.model";
import { Ship } from "./ship.model";
import { User } from "./user.model";

export class Match {
    public event_key: string;
    public match_id: number;

    public player1: string;
    public player2: string;
    
    public players: number;

    public player_1_ships: Ship[]; // Naves del jugador 1 dentro del tablero
    public player_2_ships: Ship[]; // Naves del jugador 2 dentro del tablero

    public p1_game_history: number; // Bitacora de disparo del jugador 1
    public p2_game_history: number; // Bitacora de disparo del jugador 2



  }