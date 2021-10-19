import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ClassEvent } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  /**
   * ------------------------------------------------
   * http requests de registro y login
   * ------------------------------------------------
   */

  /**
   * ------------------------------------------------
   * http requests de canciones
   * ------------------------------------------------
   */

  /**
   * @name updateEvent()
   * @description Updates event
   */
  updateCancion(event: ClassEvent) {
    console.log(event);
    this.http
      .put('http://localhost:8080/api/update_song/', event, {
        headers: this.headers,
      })
      .subscribe((response) => {
        console.log(response);
      });
    this.fetchEvents();
  }

  /**
   * @name deleteEvent()
   * @argument {ClassEvent} event
   * @description Deletes event
   */
  deleteEvent(event_key: string) {
      console.log(event_key)
    this.http
      .delete<ClassEvent>(
        'https://netcoreapisql20211019122911.azurewebsites.net/api/Event/' + event_key,
        { headers: this.headers }
      )
      .subscribe();
    this.fetchEvents();
  }

  /**
   * @name storeEvent()
   * @argument {ClassEvent} event
   * @description It sends an http post request with event as argument to store the respective events
   * in the database.
   */
  storeEvent(event: ClassEvent) {
    this.http
      .post(
        'https://netcoreapisql20211019122911.azurewebsites.net/api/Event',
        event,
        { headers: this.headers }
      )
      .subscribe((response) => {
        console.log(response);
      });
    this.fetchEvents();
  }

  /**
   * @name fetchEvents()
   * @returns An observable array of events
   */
  fetchEvents() {
    return this.http.get<ClassEvent[]>(
      'https://netcoreapisql20211019122911.azurewebsites.net/api/Event',
      { headers: this.headers }
    );
  }
}
