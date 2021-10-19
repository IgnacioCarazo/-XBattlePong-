import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClassEvent } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  events: ClassEvent[];
  subscription: Subscription;

  constructor(private eventService: EventService,
              private router: Router,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.subscription = this.eventService.eventsChanged
      .subscribe(
        (events: ClassEvent[]) => {
          this.events = events;
        }
      );
    this.events = this.eventService.getEvents();
  }

  /**
  * @name onNewEvent
  * @description Sets the link to 'new'
  */
  onNewEvent() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  actualizar(){
    this.dataStorageService.fetchEvents().
      subscribe( events => {
          this.events = events;
          this.eventService.setEvents(this.events);
          console.log(this.events)
      });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}