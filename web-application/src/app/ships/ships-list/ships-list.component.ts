import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ship } from 'src/app/models/ship.model';
import { ShipService } from 'src/app/services/ship.service';

@Component({
  selector: 'app-ships-list',
  templateUrl: './ships-list.component.html',
  styleUrls: ['./ships-list.component.css'],
})
export class ShipsListComponent implements OnInit {
  ships: Ship[];
  subscription: Subscription;

  constructor(
    private shipService: ShipService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.shipService.shipsChanged.subscribe(
      (ships: Ship[]) => {
        this.ships = ships;
      }
    );
    this.ships = this.shipService.getShips();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
