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
    new Ship(
      'Carrier',
      2,
      3,
      'https://previews.123rf.com/images/gn8/gn81606/gn8160600006/57880956-aircraft-carrier-with-planes-on-board-top-view-flat-.jpg',
      1,
      4
    ),
    new Ship(
      'Cruiser',
      1,
      3,
      'https://opengameart.org/sites/default/files/ship_big_water_ripple.gif',
      0,
      4
    ),
    new Ship(
      'Submarine',
      1,
      1,
      'https://www.wingsofwar.org/forums/downloads/kaidai-type%20submarine%201%20200%20post_519.jpg',
      0,
      4
    ),
    new Ship(
      'Destroyer',
      2,
      2,
      'https://i.pinimg.com/originals/ec/9a/64/ec9a642e7e3cd1e5223444079d5b359c.jpg',
      0,
      4
    ),
    new Ship(
      'Pirate Ship',
      1,
      2,
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/02f7fc23-e1ad-4d3c-bf35-1c3d96f43d92/d68usui-ef6c334e-11b7-4f75-88b9-ecd34c5d4bf0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyZjdmYzIzLWUxYWQtNGQzYy1iZjM1LTFjM2Q5NmY0M2Q5MlwvZDY4dXN1aS1lZjZjMzM0ZS0xMWI3LTRmNzUtODhiOS1lY2QzNGM1ZDRiZjAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.9eBMXUnCT-mrtzjodmZ0lWOjMgagGKVHWwVqqsY17U8',
      1,
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
        return true;
      }
    }
    return false;
  }
}
