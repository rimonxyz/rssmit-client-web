import {Component, OnInit} from '@angular/core';
import {EventService} from "../shared/services/event.service";
import {EventPage} from "../shared/model/event-page.model";
import {DateUtil} from "../shared/utils/date.util";
import {Auth} from "../shared/services/auth.service";
import {Event} from "../shared/model/event.model";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  eventsPage: EventPage;
  page: number;

  constructor(private eventService: EventService, private auth: Auth, private alertService: AlertService) {
  }

  ngOnInit() {
    this.page = 0;
    this.loadPage(this.page);
  }

  loadNextPage() {
    if (this.page < this.eventsPage.totalPages)
      this.page++;
    this.loadPage(this.page);
  }

  loadPreviousPage() {
    if (this.page > 0)
      this.page--;
    this.loadPage(this.page);
  }

  loadPage(page: number) {
    this.eventService.getEvents(page).subscribe(eventsPage => {
      console.log("Loaded page: " + this.page);
      this.eventsPage = eventsPage;
      console.log(this.eventsPage);
    }, err => this.auth.refreshToken());
  }

  getWeightPercentage(value: number) {
    return value * 100 / 5;
  }

  getReadableDate(date: Date): string {
    return DateUtil.formatReadableDateTime(date);
  }

  showData(event: Event) {
    this.alertService.showAlert(event.tag, JSON.stringify(event.eventData, null, 2));
  }

}
