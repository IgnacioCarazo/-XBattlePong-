import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Match } from '../models/match.model';
import { Ship } from '../models/ship.model';

@Injectable()
export class ShipService {
  shipsChanged = new Subject<Ship[]>();
  private ships: Ship[] = [
    new Ship(
      'Battleship',
      1,
      3,
      'https://st4.depositphotos.com/7316806/31621/v/450/depositphotos_316217674-stock-illustration-cruise-ship-top-view-vector.jpg',
      0,
      4
    ),
  ];
  public ship: Ship;

  constructor() {}

  /**
   * @name getShips()
   * @returns The array of ships of this service.
   */
  getShips() {
    return this.ships.slice();
  }

  /**
   * @name getShip()
   * @returns a ship
   */
   getShip(ship_name: string) {
    for (let ship of this.ships) {
        if (ship.name === ship_name) {
          this.ship = ship;
          
          return true
        }
      }
      return false;
  }
}
