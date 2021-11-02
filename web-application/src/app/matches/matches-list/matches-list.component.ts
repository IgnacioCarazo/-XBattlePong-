import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/models/match.model';
import { MatchService } from 'src/app/services/match.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.css']
})
export class MatchesListComponent implements OnInit {
  matches: Match[];
  subscription: Subscription;

  constructor(private matchService: MatchService,
              private router: Router,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.subscription = this.matchService.matchesChanged
      .subscribe(
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
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  searchMatches(){
    this.dataStorageService.fetchMatches().
      subscribe( matches => {
          this.matches = matches;
          this.matchService.setMatches(this.matches);
          console.log(this.matches)
      });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}