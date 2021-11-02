import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Match } from 'src/app/models/match.model';
import { MatchService } from 'src/app/services/match.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-matches-detail',
  templateUrl: './matches-detail.component.html',
  styleUrls: ['./matches-detail.component.css']
})
export class MatchesDetailComponent implements OnInit {
  match: Match;
  id: number;
  mode: string;

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.match = this.matchService.getMatch(this.id);
      if (this.match.multiplayer == 0) {
        this.mode = 'Un solo jugador';
      }
      if (this.match.multiplayer == 1) {
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
    this.dataStorageService.deleteEvent(this.match.event_key);
    this.dataStorageService.fetchMatches().
      subscribe( matches => {
          this.matchService.setMatches(matches);
          location.reload();
      });
    
  }
}
