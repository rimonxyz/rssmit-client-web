import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {RShared} from "../model/rshared.model";
import {Observable} from "rxjs/Observable";
import {Auth} from "./auth.service";
import {RSharedPage} from "../model/rshared_page.model";
import {UserRev} from "../model/user-rev.model";
import {ApiEndpoints} from "./api.endpoints";

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

  getRSharedListByStatusPaginated(active: boolean, page: number): Observable<RSharedPage> {
    return this.http.get(this.getRSharedByStatusUrl(active, page)).map((response: Response) => <RSharedPage>response.json()).catch(this.handleError);
  }

  getSingleUserRevenue(userId: number, month: string, year: string): Observable<UserRev> {
    return this.http.get(this.getSingleUserRevUrl(userId, month, year)).map((response: Response) => {
      let r: any = response.json();
      r.from = new Date(r.from);
      r.to = new Date(r.to);
      return <UserRev> r;
    }).catch(this.handleError);
  }

  activateRSharedEntity(rshareId:number):Observable<RShared>{
    return this.http.post(this.getActivateRSharedUrl(rshareId),null).map((response: Response)=>{
      let r = response.json();
      r.from = new Date(r.from);
      r.to = new Date(r.to);
      r.created = new Date(r.created);
      r.lastUpdated= new Date(r.lastUpdated);
      return <RShared> r;
    }).catch(this.handleError);
  }

  getSingleUserRevUrl(userId, month, year): string {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/users/" + userId + "/rev?month=" + month + "&year=" + year + "&access_token=" + this.auth.getAccessToken();
  }

  getCreateRSharedUrl(rShared: RShared): string {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + '/rshared?revenueAmount=' + rShared.revenueAmount + '&sharePercentage=' + rShared.sharePercentage + '&month=' + rShared.month + '&year=' + rShared.year + '&access_token=' + this.auth.getAccessToken();
  }

  getAllRSharedUrl(page: number) {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + '/rshared?page=' + page + '&access_token=' + this.auth.getAccessToken();
  }

  handleError(err): Observable<Response> {
    return Observable.throw(err);
  }

  private getRSharedByStatusUrl(active: boolean, page: number) {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + '/admin/rshared?active=' + active + '&page=' + page + '&access_token=' + this.auth.getAccessToken();
  }

  private getActivateRSharedUrl(rshareId: number): string {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + '/admin/rshared/' + rshareId + '/activate?access_token=' + this.auth.getAccessToken();
  }
}
