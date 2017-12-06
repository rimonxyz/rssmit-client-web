import {Injectable} from "@angular/core";
import {IUserBind} from "../model/user-bind.model";
import {IUser} from "../model/user.model";
import {Observable} from 'rxjs/Rx';
import {Http, Response} from '@angular/http';
import {UserPage} from "../model/user_page.model";
import {Auth} from "./auth.service";
import {ApiEndpoints} from "./api.endpoints";
import {Transaction} from "../model/transactions.model";

@Injectable()
export class UserService {
  userResponse: IUser;

  constructor(private http: Http, private auth: Auth) {
  }

  getUsers(page: number): Observable<UserPage> {
    return this.http.get(this.getUserPageUrl(page))
      .map((response: Response) => <UserPage>response.json()).catch(this.handleError);
  }

  getEligibleUsersForSharing(rshareId: number, page: number): Observable<UserPage> {
    return this.http.get(this.getEligibleUsersForSharingUrl(rshareId, page))
      .map((response: Response) => <UserPage>response.json()).catch(this.handleError);
  }

  getAlreadyPaidUsers(rshareId: number, page: number): Observable<UserPage> {
    return this.http.get(this.getAlreadyPaidUsersUrl(rshareId, page))
      .map((response: Response) => <UserPage>response.json()).catch(this.handleError);
  }

  register(user: IUserBind): Observable<IUser> {
    return this.http.post(this.getDevRegistrationUrl(user), null)
      .map((response: Response) => {
        let r: any = response.json();
        r.created = new Date(r.created);
        r.lastUpdated = new Date(r.lastUpdated);
        return r;
      })
      .catch(this.handleError);
  }

  private getDevRegistrationUrl(user: IUserBind) {
    return ApiEndpoints.BASE_URL + "/dev/register?name=" + user.name + "&username=" + user.username + "&email=" + user.email + "&password=" + user.password;
  }

  private getUserPageUrl(page: number) {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/users?page=" + page + "&access_token=" + this.auth.getAccessToken();
  }

  private getEligibleUsersForSharingUrl(rshareId: number, page: number) {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/rshared/" + rshareId + "/eligibleUsers?page=" + page + "&access_token=" + this.auth.getAccessToken();
  }

  private getAlreadyPaidUsersUrl(rshareId: number, page: number) {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/rshared/" + rshareId + "/paidUsers?page=" + page + "&access_token=" + this.auth.getAccessToken();
  }

  private getPayUserUrl(payUserId: number, rshareId: number, payAmount: number) {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/transactions/create?access_token=" + this.auth.getAccessToken()
      + "&userId=" + payUserId
      + "&rShareId=" + rshareId
      + "&amount=" + payAmount;
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  payUsers(payUserId: number, rshareId: number, payAmount: number): Observable<Transaction> {
    return this.http.post(this.getPayUserUrl(payUserId, rshareId, payAmount), null).map((response: Response) => {
      let r = response.json();
      r.created = new Date(r.created);
      r.lastUpdated = new Date(r.lastUpdated);
      r.fromDate = new Date(r.fromDate);
      r.toDate = new Date(r.toDate);
      return <Transaction> r;
    });
  }
}
