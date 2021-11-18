export class Ship {
    public name: string;
    public length: number;
    public width: number;
    public image: string;
    public one_shot: number; // If true the ship gets destroyed by one shot only, else it needs to have its lives on 0
    public lives: number; // Lives according to the size of ship. eg: size is 3x1 = 3 lives, 2x2 = 4 lives, etc

    constructor(name: string, length: number, width: number, image:string, one_shot: number, lives: number) {
      this.name = name;
      this.length = length;
      this.width = width;
      this.image = image;
      this.one_shot = one_shot;
      this.lives = lives;
    }
  }