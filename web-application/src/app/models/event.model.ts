import { Ship } from "./ship.model";

export class ClassEvent {
    public number: number;
    public event_key: string;
    public event_code: number;
    public name: string;
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
    public shipAvailable: Ship[]; // Naves disponibles para colocar en el tablero

  }