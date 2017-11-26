import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Auth} from "./auth.service";
import {EventPage} from "../model/event-page.model";
import {LocalStorage} from "./local-storage.service";
import {Event} from "../model/event.model";

@Injectable()
export class EventService {

  constructor(private http: Http, private auth: Auth, private storage: LocalStorage) {
  }

  getEvents(): Observable<EventPage> {
    let url: string = this.getEventPageUrl();
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

  getEventPageUrl(): string {
    return 'http://172.104.166.238:9090/api/v1/events?access_token=' + this.storage.retrive(this.storage.KEYS.accessToken);
  }


  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
