import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsDetailComponent } from './events/events-detail/events-detail.component';
import { EventsEditComponent } from './events/events-edit/events-edit.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { MatchesDetailComponent } from './matches/matches-detail/matches-detail.component';
import { MatchesEditComponent } from './matches/matches-edit/matches-edit.component';
import { MatchesComponent } from './matches/matches.component';
import { EventsResolver } from './shared/event-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // Events routes
  {
    path: 'events',
    component: EventsComponent,
   resolve: [EventsResolver],
    children: [
      { path: 'new', component: EventsEditComponent },
      {
        path: ':id',
        component: EventsDetailComponent,
      },
      {
        path: ':id/edit',
        component: EventsEditComponent,
      },
    ],
  },
  // Matches routes
  {
    path: 'matches',
    component: MatchesComponent,
   //resolve: [EventsResolver],
    children: [
      { path: 'new', component: MatchesEditComponent },
      {
        path: ':id',
        component: MatchesDetailComponent,
        //resolve: [EventsResolver],
      },
      {
        path: ':id/edit',
        component: MatchesEditComponent,
        //resolve: [EventsResolver],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
