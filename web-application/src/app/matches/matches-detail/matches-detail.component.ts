import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClassEvent } from 'src/app/models/event.model';
import { Match } from 'src/app/models/match.model';
import { EventService } from 'src/app/services/event.service';
import { MatchService } from 'src/app/services/match.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-matches-detail',
  templateUrl: './matches-detail.component.html',
  styleUrls: ['./matches-detail.component.css']
})
export class MatchesDetailComponent implements OnInit {
  match: Match;
  event: ClassEvent;
  id: number;
  mode: string;

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.match = this.matchService.getMatch(this.id);
      this.event = this.eventService.getCurrentEvent();
      if (this.event.multiplayer == 0) {
        this.mode = 'Un solo jugador';
      }
      if (this.event.multiplayer == 1) {
        this.mode = 'Multijugador';
      }
    });

    
    
  }

  /**
   * @name onEditMatch()
   * @description Sets the link to 'edit'.
   */
  onEditMatch() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  /**
   * @name onDeleteMatch()
   * @description Deletes the current event.
   */
  onDeleteMatch() {
    
    this.router.navigate(['/events']);
    this.dataStorageService.deleteMatch(this.match.match_id);
    this.dataStorageService.fetchMatches(this.match.event_key).
      subscribe( matches => {
          this.matchService.setMatches(matches);
          location.reload();
      });
    
  }
}
