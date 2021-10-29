import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsDetailComponent } from './events/events-detail/events-detail.component';
import { EventsEditComponent } from './events/events-edit/events-edit.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { EventsResolver } from './shared/event-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'events',
    component: EventsComponent,
   resolve: [EventsResolver],
    children: [
      { path: 'new', component: EventsEditComponent },
      {
        path: ':id',
        component: EventsDetailComponent,
        resolve: [EventsResolver],
      },
      {
        path: ':id/edit',
        component: EventsEditComponent,
        resolve: [EventsResolver],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
