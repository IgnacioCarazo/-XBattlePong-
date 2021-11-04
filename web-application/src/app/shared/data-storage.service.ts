import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ClassEvent } from '../models/event.model';
import { Match } from '../models/match.model';
import { EventService } from '../services/event.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient,
              private eventService: EventService) {}

  /**
   * ------------------------------------------------
   * http requests de registro y login
   * ------------------------------------------------
   */

  /**
   * ------------------------------------------------
   * http requests de Eventos
   * ------------------------------------------------
   */

  /**
  * @name getEvent()
  * @argument {string} event_key
  * @description  It sends an http get request to the backend with the an event_key and returns an event. 
  * @returns {Observable<ClassEvent[]>} An event
  */
   getEvent(event_key: string): Observable<ClassEvent> {
    return this.http.get<ClassEvent>('https://localhost:5001/api/Client/login/'+ event_key);    
  }

  /**
   * @name updateEvent()
   * @description Updates event
   */
  updateEvent(event: ClassEvent) {
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

  /**
   * ------------------------------------------------
   * http requests de Partidas
   * ------------------------------------------------
   */

  /**
   * @name updateMatch()
   * @description Updates event
   */
   updateMatch(match: Match) {
    console.log(event);
    this.http
      .put('http://localhost:8080/api/update_song/', match, {
        headers: this.headers,
      })
      .subscribe((response) => {
        console.log(response);
      });
    this.fetchMatches(this.eventService.getCurrentEvent().event_key);
  }

  /**
   * @name deleteMatches()
   * @argument {Match} match
   * @description Deletes match
   */
  deleteMatch(match_id: number) {
      console.log(match_id)
    this.http
      .delete<ClassEvent>(
        'https://netcoreapisql20211019122911.azurewebsites.net/api/Event/' + match_id,
        { headers: this.headers }
      )
      .subscribe();
    this.fetchMatches(this.eventService.getCurrentEvent().event_key);
  }

  /**
   * @name storeMatch()
   * @argument {Match} event
   * @description It sends an http post request with a match as argument to store the respective match
   * in the database.
   */
   storeMatch(match: Match) {
    this.http
      .post(
        'https://netcoreapisql20211019122911.azurewebsites.net/api/match',
        match,
        { headers: this.headers }
      )
      .subscribe((response) => {
        console.log(response);
      });
    this.fetchMatches(this.eventService.getCurrentEvent().event_key);
  }

  /**
   * @name fetchMatches()
   * @returns An observable array of events
   */
   fetchMatches(event_key: string) {
     console.log("FETCH MATCHES")
    return this.http.get<Match[]>(
      'https://netcoreapisql20211019122911.azurewebsites.net/api/match/allmatchs/' + event_key,
      { headers: this.headers }
    );
  }
}
