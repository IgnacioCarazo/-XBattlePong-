import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { ClassEvent } from '../models/event.model';
import { EventService } from '../services/event.service';

import { DataStorageService } from '../shared/data-storage.service';


@Injectable({ providedIn: 'root' })
export class EventsResolver implements Resolve<ClassEvent[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private eventService: EventService
  ) {}
  events = this.eventService.getEvents();

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.dataStorageService.fetchEvents().
      subscribe( events => {
          this.events = events;
          this.eventService.setEvents(this.events);
          console.log(this.events)

      });
      return this.eventService.getEvents();

  }
}