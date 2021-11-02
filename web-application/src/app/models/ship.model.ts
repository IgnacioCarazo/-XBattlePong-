export class Ship {
    public name: number;
    public lenght: number;
    public width: number;
    public image: string;
    public one_shot: boolean; // If true the ship gets destroyed by one shot only, else it needs to have its lives on 0
    public lives: number; // Lives according to the size of ship. eg: size is 3x1 = 3 lives, 2x2 = 4 lives, etc
  }