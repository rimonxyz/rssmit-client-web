import {Injectable} from "@angular/core";
import {Auth} from "./auth.service";
import {Http, Response} from "@angular/http";
import {ApiEndpoints} from "./api.endpoints";
import {Observable} from "rxjs/Observable";
import {TransactionPage} from "../model/transaction-page.model";
import {PaymentRequestsPage} from "../model/payment_requests_page.model";
import {PaymentRequest} from "../model/payment_request.model";

@Injectable()
export class TransactionService {

  constructor(private auth: Auth, private http: Http) {
  }

  getAllTransactionsForClient(page: number) {
    return this.http.get(this.getAllTransactionsForClientUrl(page))
      .map((r: Response) => {
        let trnxP = r.json()
        trnxP.content.forEach(t => {
          t.created = new Date(t.created);
          t.lastUpdated = new Date(t.lastUpdated);
          t.fromDate = new Date(t.fromDate);
          t.toDate = new Date(t.toDate);
        });
        return <TransactionPage>trnxP;
      })
      .catch(this.handleError);
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
        });
        return <TransactionPage>trnxP;
      })
      .catch(this.handleError);
  }

  getPaymentRequests(isPaid: boolean, page: number): Observable<PaymentRequestsPage> {
    return this.http.get(this.getPaymentRequestsUrl(isPaid, page)).map((response: Response) => {
      let reqPage: any = response.json();
      reqPage.content.forEach(r => {
        r.created = new Date(r.created);
        r.lastUpdated = new Date(r.lastUpdated);
        if (r.user != null) {
          r.user.created = new Date(r.user.created);
          r.user.lastUpdated = new Date(r.user.lastUpdated);
        }
        if (r.trnx != null) {
          r.trnx.created = new Date(r.trnx.created);
          r.trnx.lastUpdated = new Date(r.trnx.lastUpdated);
          r.trnx.fromDate = new Date(r.trnx.fromDate);
          r.trnx.toDate = new Date(r.trnx.toDate);
        }
      });
      return <PaymentRequestsPage> reqPage;
    }).catch(this.handleError)
  }

  resolvePaymentRequest(reqId: number, amount: number, trnxId: string): Observable<PaymentRequest> {
    return this.http.post(this.getResolvePaymentRequestUrl(reqId, amount, trnxId), null).map((response: Response) => {
      let r: any = response.json();
      r.created = new Date(r.created);
      r.lastUpdated = new Date(r.lastUpdated);
      if (r.user != null) {
        r.user.created = new Date(r.user.created);
        r.user.lastUpdated = new Date(r.user.lastUpdated);
      }
      if (r.trnx != null) {
        r.trnx.created = new Date(r.trnx.created);
        r.trnx.lastUpdated = new Date(r.trnx.lastUpdated);
        r.trnx.fromDate = new Date(r.trnx.fromDate);
        r.trnx.toDate = new Date(r.trnx.toDate);
      }
      return <PaymentRequest> r;
    }).catch(this.handleError);
  }

  getResolvePaymentRequestUrl(reqId: number, amount: number, trnxId: string) {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/payments/requests/" + reqId + "/resolve?amount=" + amount + "&trnxId=" + trnxId + "&access_token=" + this.auth.getAccessToken();
  }

  getPaymentRequestsUrl(isPaid: boolean, page: number) {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/payments/requests/" + this.auth.getClientId() + "?paid=" + isPaid + "&page=" + page + "&access_token=" + this.auth.getAccessToken();
  }
  getTransactionsUrl(userId: number): string {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/transactions/" + userId + "?access_token=" + this.auth.getAccessToken();
  }

  getAllTransactionsForClientUrl(page: number): string {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + "/transactions/byClient/" + this.auth.getClientId() + "?page=" + page + "&access_token=" + this.auth.getAccessToken();
  }

  handleError(err): Observable<Response> {
    return Observable.throw(err);
  }
}
