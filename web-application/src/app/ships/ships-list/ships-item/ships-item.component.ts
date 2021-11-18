import { Component, Input, OnInit } from '@angular/core';
import { Ship } from 'src/app/models/ship.model';

@Component({
  selector: 'app-ships-item',
  templateUrl: './ships-item.component.html',
  styleUrls: ['./ships-item.component.css']
})
export class ShipsItemComponent implements OnInit {

  
  @Input() ship: Ship;
 

  ngOnInit(): void {
  }

}
