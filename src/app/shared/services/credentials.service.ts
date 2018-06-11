import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Auth} from "./auth.service";
import {Observable} from "rxjs/Observable";
import {Credentials} from "../model/credentials.model";
import {ApiEndpoints} from "./api.endpoints";

@Injectable()
export class CredentialsService {

  constructor(private http: Http, private auth: Auth) {
  }

  getCredentials(): Observable<Credentials> {
    let url: string = this.getCredentialsUrl();
    return this.http.get(url)
      .map((cr: Response) => <Credentials>cr.json())
      .map(
        (credentials: Credentials) => {
          credentials.created = new Date(credentials.created);
          credentials.lastUpdated = new Date(credentials.lastUpdated);
          return credentials;
        }
      ).catch(this.handleError);
  }

  postCredentials(credentials: Credentials): Observable<Credentials> {
    let url: string = this.postCredentialsUrl(credentials);
    return this.http.post(url, null)
      .map((cr: Response) => <Credentials>cr.json())
      .map(
        (credentials: Credentials) => {
          credentials.created = new Date(credentials.created);
          credentials.lastUpdated = new Date(credentials.lastUpdated);
          return credentials;
        }
      ).catch(this.handleError);
  }

  getCredentialsUrl(): string {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + '/credentials?access_token=' + this.auth.getAccessToken();
  }

  postCredentialsUrl(credentials: Credentials): string {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + '/credentials?access_token=' + this.auth.getAccessToken() + '&firebaseServerKey=' + credentials.firebaseServerKey + "&clientId=" + credentials.clientId + "&clientSecret=" + credentials.clientSecret;
  }


  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
