import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClassEvent } from 'src/app/models/event.model';
import { Match } from 'src/app/models/match.model';
import { EventService } from 'src/app/services/event.service';
import { MatchService } from 'src/app/services/match.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.css'],
})
export class MatchesListComponent implements OnInit {
  matches: Match[];
  subscription: Subscription;
  event_key: string;
  event_found = false;
  event: ClassEvent;

  constructor(
    private matchService: MatchService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.subscription = this.matchService.matchesChanged.subscribe(
      (matches: Match[]) => {
        this.matches = matches;
      }
    );
    this.matches = this.matchService.getMatches();
  }

  /**
   * @name onNewEvent
   * @description Sets the link to 'new'
   */
  onNewMatch() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onSubmit(event_key: string) {
    this.event_key = event_key;
    this.event_found = this.eventService.searchEvent(this.event_key);
    if (this.event_found) {
      this.event = this.eventService.getCurrentEvent();
      this.dataStorageService
        .fetchMatches(this.event_key)
        .subscribe((matches) => {
          this.matches = matches;
          this.matchService.setMatches(this.matches);
          console.log(this.matches);
        });
      this.dataStorageService
        .fetchMatches(this.event_key)
        .subscribe((matches) => {
          this.matches = matches;
          this.matchService.setMatches(this.matches);
          console.log(this.matches);
        });
    } else {
      alert(
        'Por favor ingrese una llave de evento existente. Consulte a un organizador de su evento'
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
