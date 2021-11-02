import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Match } from '../models/match.model';

@Injectable()
export class MatchService {
  matchesChanged = new Subject<Match[]>();
  private matches: Match[] = [];
  match: Match;

  constructor() {}

  /**
   * @name setMatch()
   * @argument {Match} match
   * @description  It sets the value of this service match with the match from the argument.
   */
  setMatch(match: Match) {
    this.match = match;
  }

  /**
  * @name setMatches()
  * @argument {Match[]} matches
  * @description  It set this service matches with the value of the matches argument.
  */
   setMatches(matches: Match[]) {
    this.matches = matches;
    this.matchesChanged.next(this.matches.slice());
  }


  /**
   * @name addMatch()
   * @argument {Match} match
   * @description  Adds a match to this service array of matches
   */
  addMatch(match: Match) {
    this.matches.push(match);
    this.matchesChanged.next(this.matches.slice());
  }

  /**
   * @name updateMatch()
   * @argument {number} index
   * @argument {Match} newMatch
   * @description  It updates the value of a match of this service matches array.
   */
  updateMatch(index: number, newMatch: Match) {
    this.matches[index] = newMatch;
    this.matchesChanged.next(this.matches.slice());
  }

  /**
   * @name getMatches()
   * @returns The array of matches of this service.
   */
  getMatches() {
    return this.matches.slice();
  }

  /**
   * @name getMatch()
   * @description It searches a match by its index
   * @returns {Match} A match
   */
  getMatch(index: number) {
    return this.matches[index];
  }

  /**
   * @name deleteMatch()
   * @argument {number} index
   * @description deletes a match by its index from this service matches array.
   */
   deleteMatch(index: number) {
    this.matches.splice(index, 1);
    this.matchesChanged.next(this.matches.slice());
  }
}
