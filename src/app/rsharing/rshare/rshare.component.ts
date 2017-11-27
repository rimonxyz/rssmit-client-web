import {Component, OnInit} from '@angular/core';
import {RsharingService} from "../../shared/services/rsharing.service";
import {RShared} from "../../shared/model/rshared.model";
import {RSharedPage} from "../../shared/model/rshared_page.model";
import {ToastrService} from "../../shared/services/toastr.service";
import {DateUtil} from "../../shared/utils/date.util";

@Component({
  selector: 'app-create-rshare',
  templateUrl: './rshare.component.html',
  styleUrls: ['./rshare.component.css']
})
export class RShareComponent implements OnInit {

  rSharedPage: RSharedPage;
  page: number;

  constructor(private rsharingService: RsharingService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.page = 0;
    this.fetchRSharedPage();
  }

  shareRevenue(formValues) {
    let rShared: RShared = new RShared();
    rShared.revenueAmount = formValues.totalRevenue;
    rShared.sharePercentage = formValues.sharePercentage;
    rShared.fromDate = formValues.fromDate;
    rShared.toDate = formValues.toDate;
    this.rsharingService.createRShared(rShared).subscribe((rs: RShared) => {
      this.toastr.success('Success!', 'Successfully created a sharing entity!');
      this.fetchRSharedPage();
    }, err => console.log(err.message));
  }

  fetchRSharedPage() {
    this.rsharingService.getRSharedListPaginated(this.page).subscribe((rsp: RSharedPage) => {
      this.rSharedPage = rsp;
      console.log(this.rSharedPage);
    }, err => {
      console.log(err);
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

  getReadableDate(date: string): string{
    let d = new Date(date);
    return DateUtil.formatReadableDate(d);
  }
}
