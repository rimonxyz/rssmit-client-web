import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {EventPage} from "../model/event-page.model";
import {Event} from "../model/event.model";
import {EventStats} from "../model/event_stats.model";
import {ApiEndpoints} from "./api.endpoints";
import {Auth} from "./auth.service";

@Injectable()
export class EventService {

  constructor(private http: Http, private auth: Auth) {
  }

  getEvents(page: number): Observable<EventPage> {
    let url: string = this.getEventPageUrl(page);
    return this.http.get(url).map((ep: Response) => <EventPage>ep.json())
      .map(
        (eventPage: EventPage) => {
          eventPage.content.forEach((event: Event) => {
            event.created = new Date(event.created);
            event.lastUpdated = new Date(event.lastUpdated);
            event.date = new Date(event.date);
          })
          return eventPage;
        }).catch(this.handleError);
  }

  getEventStats(period: string): Observable<EventStats> {
    return this.http.get(this.getEventStatsUrl(period)).map((response: Response) => <EventStats> response.json()).catch(this.handleError);
  }

  getEventPageUrl(page: number): string {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + '/events?page=' + page + '&access_token=' + this.auth.getAccessToken();
  }

  getEventStatsUrl(period: string) {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + '/events/stats?period=' + period + '&access_token=' + this.auth.getAccessToken();
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
