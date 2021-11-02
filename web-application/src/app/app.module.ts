import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { EventsDetailComponent } from './events/events-detail/events-detail.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventsEditComponent } from './events/events-edit/events-edit.component';
import { EventsItemComponent } from './events/events-list/events-item/events-item.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { EventService } from './services/event.service';
import { MatchesComponent } from './matches/matches.component';
import { MatchesListComponent } from './matches/matches-list/matches-list.component';
import { MatchesItemComponent } from './matches/matches-list/matches-item/matches-item.component';
import { MatchesDetailComponent } from './matches/matches-detail/matches-detail.component';
import { MatchesEditComponent } from './matches/matches-edit/matches-edit.component';
import { MatchService } from './services/match.service';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventsComponent,
    EventsDetailComponent,
    EventsListComponent,
    EventsEditComponent,
    EventsItemComponent,
    HeaderComponent,
    MatchesComponent,
    MatchesListComponent,
    MatchesItemComponent,
    MatchesDetailComponent,
    MatchesEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [EventService, MatchService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
