import {Injectable} from "@angular/core";
import {ApiEndpoints} from "./api.endpoints";
import {Auth} from "./auth.service";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {PromosPage} from "../model/promos_page.model";
import {Promo} from "../model/promo.model";

@Injectable()
export class PromosService {

  constructor(private http: Http, private auth: Auth) {
  }

  getAllPromos(page: number): Observable<PromosPage> {
    let url: string = this.getAllPromosUrl(page);
    return this.http.get(url).map((ep: Response) => <PromosPage>ep.json())
      .map(
        (promosPage: PromosPage) => {
          promosPage.content.forEach((promo: Promo) => {
            promo.created = new Date(promo.created);
            promo.lastUpdated = new Date(promo.lastUpdated);
          });
          return promosPage;
        }).catch(this.handleError);
  }

  createPromo(promo: Promo): Observable<Response> {
    let url: string = this.getCreatePromoUrl(promo);
    return this.http.post(url, null).map((response: Response) => response.json()).catch(this.handleError);
  }

  togglePromo(promo: Promo): Observable<Response> {
    let url: string = this.getTogglePromosUrl(promo.id);
    return this.http.post(url, null).map((response: Response) => response.json()).catch(this.handleError);
  }

  getAllPromosUrl(page: number): string {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/admin/promos?page=" + page + "&access_token=" + this.auth.getAccessToken();
  }

  getTogglePromosUrl(promoId: number): string {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/admin/promos/" + promoId + "/toggleActivation?access_token=" + this.auth.getAccessToken();
  }

  getCreatePromoUrl(promo: Promo): string {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/admin/promos?title=" + promo.title + "&url=" + promo.url + "&description=" + promo.description + "&access_token=" + this.auth.getAccessToken();
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
