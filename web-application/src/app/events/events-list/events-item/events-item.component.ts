import { Component, Input, OnInit } from '@angular/core';
import { ClassEvent } from 'src/app/models/event.model';

@Component({
  selector: 'app-events-item',
  templateUrl: './events-item.component.html',
  styleUrls: ['./events-item.component.css']
})
export class EventsItemComponent implements OnInit {

  @Input() event: ClassEvent;
  @Input() index: number;

  ngOnInit(): void {
  }

}
