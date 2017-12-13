import {Injectable} from "@angular/core";
import {ApiEndpoints} from "./api.endpoints";
import {Auth} from "./auth.service";
import {Http, Response} from "@angular/http";
import {Statistics} from "../model/stats.model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class StatisticsService {

  constructor(private http: Http, private auth: Auth) {
  }

  getStatistics(period: string): Observable<Statistics> {
    return this.http.get(this.getStatisticsUrl(period))
      .map((response: Response) => <Statistics>response.json()).catch(this.handleError);
  }

  getStatisticsUrl(period: string): string {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/stats/" + this.auth.getClientId() + "?period=" + period + "&access_token=" + this.auth.getAccessToken();
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
