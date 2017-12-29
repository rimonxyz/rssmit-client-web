import {Component, OnInit} from '@angular/core';
import {RsharingService} from "../../shared/services/rsharing.service";
import {RShared} from "../../shared/model/rshared.model";
import {RSharedPage} from "../../shared/model/rshared_page.model";
import {ToastrService} from "../../shared/services/toastr.service";
import {DateUtil} from "../../shared/utils/date.util";
import {Auth} from "../../shared/services/auth.service";

@Component({
  selector: 'app-create-rshare',
  templateUrl: './rshare.component.html',
  styleUrls: ['./rshare.component.css']
})
export class RShareComponent implements OnInit {
  // model bind
  totalRevenue: string;
  sharePercentage: string;

  rSharedPage: RSharedPage;
  page: number;
  month: string;
  year: string;

  invalidDate: boolean;

  constructor(private rsharingService: RsharingService,
              private toastr: ToastrService,
              private auth: Auth) {
  }

  ngOnInit() {
    this.page = 0;
    // init share dates
    this.month = DateUtil.getLastMonthString(new Date()).toLowerCase();
    this.year = DateUtil.getLastMonthYear(this.month) + "";
    this.fetchRSharedPage();
  }

  shareRevenue(formValues) {
    let rShared: RShared = new RShared();
    rShared.revenueAmount = formValues.totalRevenue;
    rShared.sharePercentage = formValues.sharePercentage;
    rShared.month = formValues.month;
    rShared.year = formValues.year;
    this.rsharingService.createRShared(rShared).subscribe((rs: RShared) => {
      this.toastr.success('Success!', 'Successfully created a sharing entity!');
      this.fetchRSharedPage();
    }, err => {
      this.toastr.warning("We\'re sorry..","Could not save your sharing, Have you already shared for that month?");
      this.auth.refreshToken();
    });
  }

  fetchRSharedPage() {
    this.rsharingService.getRSharedListPaginated(this.page).subscribe((rsp: RSharedPage) => {
      this.rSharedPage = rsp;
      // console.log(this.rSharedPage);
    }, err => {
      this.auth.refreshToken();
    });
  }

  loadPreviousPage(): void {
    if (this.page > 0)
      this.page--;
    this.fetchRSharedPage();
  }

  loadNextPage(): void {
    if (this.page < this.rSharedPage.totalPages)
      this.page++;
    this.fetchRSharedPage();
  }

  getReadableDate(date: string): string {
    let d = new Date(date);
    return DateUtil.formatReadableDate(d);
  }

  onMonthInputChange() {
    this.invalidDate = this.isInvalidDate();
    console.log("IsInvalid:" +this.invalidDate);    
    // this.year = DateUtil.getLastMonthYear(this.month) + "";
  }

  onYearInputChange(year: string) {
    this.year = year;
  }

  isInvalidDate(): boolean {
    return DateUtil.isInValidDateForSharing(this.month, +this.year);
  }

  onPaymentInfoClick(rShareId: Number) {
    alert("Please pay the charge using rocket at \n017102261633\n and send a text message containing \n'ShareId: " + rShareId + "' and 'TrnxId: Your trnx id'");
  }
}
