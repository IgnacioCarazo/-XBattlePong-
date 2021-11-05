import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ClassEvent } from './models/event.model';
import { Match } from './models/match.model';
import { EventService } from './services/event.service';
import { MatchService } from './services/match.service';
/**
 * Por medio de las herramientas como Angular, jazmin y karma, permite desarrollar pruebas unitarias
 *  Las cuales suelen dividirlas en 3 pasos: arrange, act y assert
 * */
describe('AppComponent', () => {
  // Arrange
  let eventService: EventService;
  let matchService: MatchService;
  let testEvent: ClassEvent = {
    number: 11,
    event_key: "CPIPOT",
    event_code: 12345,
    name: "Prueba Unitaria",
    initial_date: "2021-10-20",
    final_date: "2021-10-21",
    initial_time: "12:00",
    final_time: "12:00",
    board_columns: 10,
    board_rows: 10,
    country: "Costa Rica",
    location: "Alajuelita",
    multiplayer: 0,
    client_name: "Pepsi",
    shooting_time: 10,
    shipsAvailable: []
  };
  let testEvent2: ClassEvent = null;
  let testMatch: Match = {
    event_key: "CPIPOT",
    match_id: 1674,
    player1: "Haziel",
    player2: "Ignacio",
    players: 1,

    player_1_ships: [],
    player_2_ships: [],

    p1_game_history: 1,
    p2_game_history: 0,
  };
  beforeEach(async () => {
    eventService = new EventService();
    matchService = new MatchService();
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{
        provide: EventService
      },
      {
        provide: MatchService
      }],
    }).compileComponents();
  });
  it('TEST1 Add Event EXPECTED: PASS', () => {
    //act
    eventService.addEvent(testEvent);
    //assert
    expect(eventService.getEvents().length).toBeGreaterThanOrEqual(1);
  });

  it('TEST1 Add Event EXPECTED: FAILURE', () => {
    //act
    eventService.addEvent(testMatch);
    //assert
    expect(eventService.getEvents().length).toEqual(0);
  });

  it('TEST2 Remove Event EXPECTED: PASS', () => {
    //act
    eventService.addEvent(testEvent);
    eventService.deleteCancion(0);
    //assert
    expect(eventService.getEvents().length).toBeLessThan(1);
  });

  it('TEST3 Create Match EXPECTED: PASS', () => {
    //act
    matchService.addMatch(testMatch);
    //assert
    expect(matchService.getMatches().length).toBeGreaterThanOrEqual(1);
  });

});

