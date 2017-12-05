import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserRev} from "../../shared/model/user-rev.model";
import {RsharingService} from "../../shared/services/rsharing.service";
import {DateUtil} from "../../shared/utils/date.util";
import {TransactionService} from "../../shared/services/transaction.service";
import {TransactionPage} from "../../shared/model/transaction-page.model";
import {Auth} from "../../shared/services/auth.service";

@Component({
  selector: 'app-earning',
  templateUrl: './earning.component.html',
  styleUrls: ['./earning.component.css']
})
export class EarningComponent implements OnInit {
  page: number;
  userId: number;
  userRev: UserRev = new UserRev();
  trnxPage: TransactionPage = new TransactionPage();

  month: string;
  year: string;

  constructor(private activatedRoute: ActivatedRoute,
              private rSharingService: RsharingService,
              private trnxService: TransactionService,
              private auth: Auth) {
  }

  ngOnInit() {
    this.page = 0;
    this.userId = +this.activatedRoute.snapshot.params['userId'];
    let currentDate: Date = new Date();
    this.month = DateUtil.monthNames[currentDate.getMonth()].toLocaleLowerCase();
    this.year = currentDate.getFullYear() + "";
    this.loadSingleUserRevenue(this.userId, this.month, this.year);

    this.loadTransactions(this.userId);
  }

  loadTransactions(userId: number) {
    this.trnxService.getTransactions(this.userId).subscribe((trnxPage: TransactionPage) => this.trnxPage = trnxPage, err => console.log(err));
  }

  loadSingleUserRevenue(userId: number, month: string, year: string) {
    this.rSharingService.getSingleUserRevenue(userId, month, year).subscribe(r => this.userRev = r, err => console.log("FUCK! " + err));
  }

  onMonthInputChange(month: string): void {
    this.month = month;
    this.loadSingleUserRevenue(this.userId, this.month, this.year);
    console.log(this.userRev);
  }

  onYearInputChange(year: string): void {
    this.year = year;
    console.log(year);
    this.loadSingleUserRevenue(this.userId, this.month, this.year);
    console.log(this.userRev);
  }


  getReadableDate(date: Date): string {
    return DateUtil.formatReadableDate(date);
  }

  getReadableDateTime(date: Date): string {
    return DateUtil.formatReadableDateTime(date);
  }

  loadNextPage() {
    if (this.page < this.trnxPage.totalPages)
      this.page++;
    this.loadTransactions(this.page);
  }

  loadPreviousPage() {
    if (this.page > 0)
      this.page--;
    this.loadTransactions(this.page);
  }
}
