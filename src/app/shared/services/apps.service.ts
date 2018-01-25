import {Injectable} from "@angular/core";
import {ApiEndpoints} from "./api.endpoints";
import {Auth} from "./auth.service";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Apps} from "../model/apps.model";
import {AppsPage} from "../model/apps_page.model";

@Injectable()
export class AppsService {

  constructor(private http: Http, private auth: Auth) {
  }

  getMyApps(page: number): Observable<AppsPage> {
    let url: string = this.getMyAppsUrl(page);
    return this.http.get(url).map((ep: Response) => <AppsPage>ep.json())
      .map(
        (appsPage: AppsPage) => {
          appsPage.content.forEach((app: Apps) => {
            app.created = new Date(app.created);
            app.lastUpdated = new Date(app.lastUpdated);
          })
          return appsPage;
        }).catch(this.handleError);
  }

  updateApp(app: Apps): Observable<Response>{
    let url : string = this.getUpdateAppUrl(app);
    return this.http.patch(url,null);
  }

  getMyAppsUrl(page: number): string {
    if (Auth.isAdmin())
      return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/admin/apps?page=" + page + "&access_token=" + this.auth.getAccessToken();
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/apps?page=" + page + "&access_token=" + this.auth.getAccessToken();
  }

  getUpdateAppUrl(app: Apps): string {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/apps/" + app.id + "?name=" + app.name + "&packageName=" + app.packageName + "&categoryName=" + app.categoryName + "&access_token=" + this.auth.getAccessToken();
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
