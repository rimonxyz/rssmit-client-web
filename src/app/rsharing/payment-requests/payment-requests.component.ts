import {Component, OnInit} from '@angular/core';
import {PaymentRequestsPage} from "../../shared/model/payment_requests_page.model";
import {TransactionService} from "../../shared/services/transaction.service";
import {Auth} from "../../shared/services/auth.service";
import {DateUtil} from "../../shared/utils/date.util";
import {ToastrService} from "../../shared/services/toastr.service";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-payment-requests',
  templateUrl: './payment-requests.component.html',
  styleUrls: ['./payment-requests.component.css']
})
export class PaymentRequestsComponent implements OnInit {
  unpaidPrPage: PaymentRequestsPage;
  upPage: number;

  paidPrPage: PaymentRequestsPage;
  pPage: number;

  payUserId: number;
  showPay: boolean;

  // payment form
  payAmount : number;
  trnxId : string;

  constructor(private trnxService: TransactionService,
              private auth: Auth,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.upPage = 0;
    this.pPage = 0;
    this.loadUnpaidRequests(this.upPage)
    this.loadPaidRequests(this.pPage);
  }

  loadUnpaidRequests(page: number) {
    this.trnxService.getPaymentRequests(false, page)
      .subscribe((upPage: PaymentRequestsPage) => this.unpaidPrPage = upPage,err => console.log(err) );
  }

  loadPaidRequests(page: number) {
    this.trnxService.getPaymentRequests(true, page)
      .subscribe((pPage: PaymentRequestsPage) => this.paidPrPage = pPage,err => err => console.log(err) );
  }

  getReadableDate(date: string): string {
    return DateUtil.formatReadableDate(new Date(date));
  }

  loadUnpaidPreviousPage() {
    if (this.upPage > 0)
      this.upPage--;
    this.loadUnpaidRequests(this.upPage);
  }

  loadUnpaidNextPage() {
    if (this.upPage < this.unpaidPrPage.size)
      this.upPage++;
    this.loadUnpaidRequests(this.upPage);
  }

  loadPaidPreviousPage() {
    if (this.pPage > 0)
      this.pPage--;
    this.loadPaidRequests(this.pPage);
  }

  loadPaidNextPage() {
    if (this.pPage < this.paidPrPage.size)
      this.pPage++;
    this.loadPaidRequests(this.pPage);
  }

  toggleSelectedForPaymenet(userId: number) {
    this.payUserId = userId;
    this.showPay = !this.showPay;
  }

  payUser(reqId: number, formValues: any) {
    console.log(formValues);
    if (formValues.payAmount == null || formValues.payAmount < 500) {
      this.toastr.warning("Failed!", "Payment amount should be at least ৳500 or more!");
      return;
    }

    this.trnxService.resolvePaymentRequest(reqId, formValues.payAmount,formValues.trnxId).subscribe(pr => {
      this.toastr.success("Success!", "Payment (amount: " + formValues.payAmount + ") saved successfully." + pr.trnx.explanation);
      this.showPay = false;
      this.loadUnpaidRequests(this.upPage);
      this.loadPaidRequests(this.pPage);
      return pr;
    }, err => {
      this.toastr.warning("We\'re sorry..","We\'re working on it! Please try again in a little while. This time it won\'t happen I promise!");
      this.auth.refreshToken();
    });
    console.log(formValues);
  }

}
