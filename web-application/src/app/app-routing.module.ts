import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsDetailComponent } from './events/events-detail/events-detail.component';
import { EventsEditComponent } from './events/events-edit/events-edit.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },

  {
    path: 'events',
    component: EventsComponent,
   //resolve: [CancionResolverService],
    children: [
      { path: 'new', component: EventsEditComponent },
      {
        path: ':id',
        component: EventsDetailComponent,
        //resolve: [CancionResolverService],
      },
      {
        path: ':id/edit',
        component: EventsEditComponent,
        //resolve: [CancionResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
