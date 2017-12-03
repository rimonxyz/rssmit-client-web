import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {RShared} from "../model/rshared.model";
import {Observable} from "rxjs/Observable";
import {Auth} from "./auth.service";
import {RSharedPage} from "../model/rshared_page.model";
import {UserRev} from "../model/user-rev.model";

@Injectable()
export class RsharingService {

  constructor(private http: Http, private auth: Auth) {
  }

  createRShared(rShared: RShared): Observable<RShared> {
    return this.http.post(this.getCreateRSharedUrl(rShared), null).map((response: Response) => <RShared>response.json()).catch(this.handleError);
  }

  getRSharedListPaginated(page: number): Observable<RSharedPage> {
    return this.http.get(this.getAllRSharedUrl(page)).map((response: Response) => <RSharedPage>response.json()).catch(this.handleError);
  }

  getSingleUserRevenue(userId: number, month: string, year: string): Observable<UserRev> {
    return this.http.get(this.getSingleUserRevUrl(userId, month, year)).map((response: Response) => {
      let r: any = response.json();
      r.from = new Date(r.from);
      r.to = new Date(r.to);
      return <UserRev> r;
    }).catch(this.handleError);
  }

  getSingleUserRevUrl(userId, month, year): string {
    return "http://172.104.166.238:9090/api/v1/users/" + userId + "/rev?month=" + month + "&year=" + year + "&access_token=" + this.auth.getAccessToken();
  }

  getCreateRSharedUrl(rShared: RShared): string {
    return 'http://172.104.166.238:9090/api/v1/rshared?revenueAmount=' + rShared.revenueAmount + '&sharePercentage=' + rShared.sharePercentage + '&month=' + rShared.month + '&year=' + rShared.year + '&access_token=' + this.auth.getAccessToken();
  }

  getAllRSharedUrl(page: number) {
    return 'http://172.104.166.238:9090/api/v1/rshared?page=' + page + '&access_token=' + this.auth.getAccessToken();
  }

  handleError(err): Observable<Response> {
    return Observable.throw(err);
  }
}
