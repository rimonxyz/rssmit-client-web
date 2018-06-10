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

  getDevelopers(page: number): Observable<UserPage> {
    return this.http.get(this.getDevelopersUrl(page))
      .map((response: Response) => <UserPage>response.json()).catch(this.handleError);
  }

  getUsers(page: number): Observable<UserPage> {
    return this.http.get(this.getUserPageUrl(page))
      .map((response: Response) => <UserPage>response.json()).catch(this.handleError);
  }

  searchUsers(query: string, page: number): Observable<UserPage> {
    return this.http.get(this.searchUsersPageUrl(query, page))
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

  sendVerificationEmail(email: string): Observable<Response> {
    return this.http.post(this.getEmailValidationUrl(email), null).map((r: Response) => r).catch(this.handleError);
  }

  verifyToken(token: string): Observable<string> {
    return this.http.post(this.getTokenVerificationUrl(token), null).map((r: Response) => {
      let res: string = r.text();
      console.log(res);
      return res;
    }).catch(this.handleError);
  }

  resetPassword(token: string, password: string) {
    return this.http.post(this.getPasswordResetUrl(token, password), null).map((r: Response) => r).catch(this.handleError);
  }

  getPasswordResetUrl(token: string, password: string) {
    return ApiEndpoints.BASE_URL + "/resetPassword?token=" + token + "&password=" + password;
  }

  getTokenVerificationUrl(token: string) {
    return ApiEndpoints.BASE_URL + "/checkTokenValidity?token=" + token;
  }

  getEmailValidationUrl(email: string) {
    return ApiEndpoints.BASE_URL + "/resetPassword/verifyEmail?email=" + email;

  }
  private getDevRegistrationUrl(user: IUserBind) {
    return ApiEndpoints.BASE_URL + "/dev/register?name=" + user.name + "&username=" + user.username + "&email=" + user.email + "&password=" + user.password;
  }

  private getUserPageUrl(page: number) {
    if (Auth.isAdmin())
      return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/admin/users?page=" + page + "&access_token=" + this.auth.getAccessToken();
    else
      return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/users?page=" + page + "&access_token=" + this.auth.getAccessToken();
  }

  private searchUsersPageUrl(query: string, page: number) {
    if (Auth.isAdmin())
      return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/admin/users?query=" + query + "&page=" + page + "&access_token=" + this.auth.getAccessToken();
    else
      return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/users?query=" + query + "&page=" + page + "&access_token=" + this.auth.getAccessToken();
  }

  private getDevelopersUrl(page: number) {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/admin/users/devs?page=" + page + "&access_token=" + this.auth.getAccessToken();
  }

  private getEligibleUsersForSharingUrl(rshareId: number, page: number) {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/rshared/" + rshareId + "/eligibleUsers?page=" + page + "&access_token=" + this.auth.getAccessToken();
  }

  private getAlreadyPaidUsersUrl(rshareId: number, page: number) {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/rshared/" + rshareId + "/paidUsers?page=" + page + "&access_token=" + this.auth.getAccessToken();
  }

  private getPayUserUrl(payUserId: number, rshareId: number, payAmount: number, trnxId: string) {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/transactions/create?access_token=" + this.auth.getAccessToken()
      + "&userId=" + payUserId
      + "&rShareId=" + rshareId
      + "&amount=" + payAmount + "&trnxId=" + trnxId;
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  payUsers(payUserId: number, rshareId: number, payAmount: number, trnxId: string): Observable<Transaction> {
    return this.http.post(this.getPayUserUrl(payUserId, rshareId, payAmount, trnxId), null).map((response: Response) => {
      let r = response.json();
      r.created = new Date(r.created);
      r.lastUpdated = new Date(r.lastUpdated);
      r.fromDate = new Date(r.fromDate);
      r.toDate = new Date(r.toDate);
      return <Transaction> r;
    });
  }
}
