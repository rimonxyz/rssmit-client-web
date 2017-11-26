import {Component, OnInit} from '@angular/core';
import {EventService} from "../shared/services/event.service";
import {EventPage} from "../shared/model/event-page.model";
import {DateUtil} from "../shared/utils/date.util";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  eventsPage: EventPage;

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.eventService.getEvents().subscribe(eventsPage => this.eventsPage = eventsPage);
    console.log(this.eventsPage);
  }

  getWeightPercentage(value: number) {
    return value * 100 / 5;
  }

  getReadableDate(date: Date): string{
    return DateUtil.formatReadableDate(date);
  }

}
