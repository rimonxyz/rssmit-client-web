import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {RShared} from "../model/rshared.model";
import {Observable} from "rxjs/Observable";
import {Auth} from "./auth.service";
import {RSharedPage} from "../model/rshared_page.model";

@Injectable()
export class RsharingService {

  constructor(private http: Http, private auth: Auth) {
  }

  createRShared(rShared: RShared): Observable<RShared> {
    return this.http.post(this.getCreateRSharedUrl(rShared), null).map((response: Response) => <RShared>response.json()).catch(this.handleError);
  }

  getRSharedListPaginated(page: number): Observable<RSharedPage>{
    return this.http.get(this.getAllRSharedUrl(page)).map((response:Response)=> <RSharedPage>response.json()).catch(this.handleError);
  }

  getCreateRSharedUrl(rShared: RShared): string {
    return 'http://172.104.166.238:9090/api/v1/rshared?revenueAmount=' + rShared.revenueAmount + '&sharePercentage=' + rShared.sharePercentage + '&fromDate=' + rShared.fromDate + '&toDate=' + rShared.toDate + '&access_token=' + this.auth.getAccessToken();
  }

  getAllRSharedUrl(page: number) {
    return 'http://172.104.166.238:9090/api/v1/rshared?page=' + page + '&access_token=' + this.auth.getAccessToken();
  }

  handleError(err): Observable<Response> {
    return Observable.throw(err);
  }
}
