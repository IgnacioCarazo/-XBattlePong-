import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    
  }
}
