import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClassEvent } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-events-detail',
  templateUrl: './events-detail.component.html',
  styleUrls: ['./events-detail.component.css'],
})
export class EventsDetailComponent implements OnInit {
  event: ClassEvent;
  id: number;
  mode: string;
  ships = [];

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.event = this.eventService.getEvent(this.id);
      if (this.event.multiplayer == 0) {
        this.mode = 'Un solo jugador';
      }
      if (this.event.multiplayer == 1) {
        this.mode = 'Multijugador';
      }
      this.ships = this.event.shipsAvailable;
    });

    
    
  }

  /**
   * @name onEditEvent()
   * @description Sets the link to 'edit'.
   */
  onEditEvent() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  /**
   * @name onDeleteEvent()
   * @description Deletes the current event.
   */
  onDeleteEvent() {
    
    
    this.router.navigate(['/events']);
    this.dataStorageService.deleteEvent(this.event.event_key);
    this.dataStorageService.fetchEvents().
      subscribe( events => {
          this.eventService.setEvents(events);
          location.reload();
      });
    
  }
}
