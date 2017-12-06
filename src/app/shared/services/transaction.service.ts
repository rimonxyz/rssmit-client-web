import {Injectable} from "@angular/core";
import {Auth} from "./auth.service";
import {Http, Response} from "@angular/http";
import {ApiEndpoints} from "./api.endpoints";
import {Observable} from "rxjs/Observable";
import {TransactionPage} from "../model/transaction-page.model";

@Injectable()
export class TransactionService {

  constructor(private auth: Auth, private http: Http) {
  }

  getTransactions(userId: number): Observable<TransactionPage> {
    return this.http.get(this.getTransactionsUrl(userId))
      .map((r: Response) => {
        let trnxP = r.json()
        trnxP.content.forEach(t => {
          t.created = new Date(t.created);
          t.lastUpdated = new Date(t.lastUpdated);
          t.fromDate = new Date(t.fromDate);
          t.toDate = new Date(t.toDate);
        })
        return <TransactionPage>trnxP;
      })
      .catch(this.handleError);
  }

  getTransactionsUrl(userId: number): string {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/transactions/" + userId + "?access_token=" + this.auth.getAccessToken();
  }

  handleError(err): Observable<Response> {
    return Observable.throw(err);
  }
}
