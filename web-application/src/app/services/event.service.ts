import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClassEvent } from '../models/event.model';

@Injectable()
export class EventService {
  eventsChanged = new Subject<ClassEvent[]>();
  private events: ClassEvent[] = [];
  event: ClassEvent;

  constructor() {}

  /**
   * @name setEvent()
   * @argument {ClassEvent} event
   * @description  It sets the value of this service event with the event from the argument.
   */
  setEvent(event: ClassEvent) {
    this.event = event;
  }

  /**
  * @name setEvents()
  * @argument {ClassEvent[]} events
  * @description  It set this service events with the value of the events argument.
  */
   setEvents(events: ClassEvent[]) {
    this.events = events;
    this.eventsChanged.next(this.events.slice());
  }


  /**
   * @name addEvent()
   * @argument {ClassEvent} event
   * @description  Adds a event to this service array of events
   */
  addEvent(event: ClassEvent) {
    this.events.push(event);
    this.eventsChanged.next(this.events.slice());
  }

  /**
   * @name updateEvent()
   * @argument {number} index
   * @argument {ClassEvent} newEvent
   * @description  It updates the value of a event of this service events array.
   */
  updateEvent(index: number, newEvent: ClassEvent) {
    this.events[index] = newEvent;
    this.eventsChanged.next(this.events.slice());
  }

  /**
   * @name getEvents()
   * @returns The array of events of this service.
   */
  getEvents() {
    return this.events.slice();
  }

  /**
   * @name searchEvent()
   * @description  It updates the value of a event of this service events array.
   */
   searchEvent(event_key: string) {
     for (let event of this.events) {
       if (event.event_key === event_key) {
         this.event = event;
         return true
       }
     }
     return false;
  }

  /**
   * @name getEvent()
   * @description It searches a event by its index
   * @returns {ClassEvent} A cancion
   */
  getEvent(index: number) {
    return this.events[index];
  }

  /**
   * @name getCurrentEvent()
   * @description It searches a event by its index
   * @returns {ClassEvent} A cancion
   */
   getCurrentEvent() {
    return this.event;
  }

  /**
   * @name deleteEvent()
   * @argument {number} index
   * @description deletes a event by its index from this service events array.
   */
  deleteCancion(index: number) {
    this.events.splice(index, 1);
    this.eventsChanged.next(this.events.slice());
  }
}
