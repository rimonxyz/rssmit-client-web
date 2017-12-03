import {Injectable} from "@angular/core";
import {IUserBind} from "../model/user-bind.model";
import {IUser} from "../model/user.model";
import {Observable} from 'rxjs/Rx';
import {Http, Response} from '@angular/http';
import {UserPage} from "../model/user_page.model";
import {Auth} from "./auth.service";

@Injectable()
export class UserService {
  userResponse: IUser;

  constructor(private http: Http, private auth: Auth) {
  }

  getUsers(page: number): Observable<UserPage> {
    return this.http.get(this.getUserPageUrl(page))
      .map((response: Response) => <UserPage>response.json()).catch(this.handleError)
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
    return "http://172.104.166.238:9090/dev/register?name=" + user.name + "&username=" + user.username + "&email=" + user.email + "&password=" + user.password;
  }

  private getUserPageUrl(page: number) {
    return "http://172.104.166.238:9090/api/v1/users?page=" + page + "&access_token=" + this.auth.getAccessToken();
  }


  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
