import {Component, OnInit} from '@angular/core';
import {UserPage} from "../../shared/model/user_page.model";
import {UserService} from "../../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {DateUtil} from "../../shared/utils/date.util";
import {ToastrService} from "../../shared/services/toastr.service";

@Component({
  selector: 'app-eligible-users',
  templateUrl: './eligible-users.component.html',
  styleUrls: ['./eligible-users.component.css']
})
export class EligibleUsersComponent implements OnInit {

  userPage: UserPage;
  page: number;
  rshareId: number;

  payUserId: number;
  showPay: boolean;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.page = 0;
    this.rshareId = this.activatedRoute.snapshot.params['rshareId'];
    this.loadEligibleUsers(this.rshareId, this.page);
  }

  loadEligibleUsers(rshareId: number, page: number) {
    this.userService.getEligibleUsersForSharing(rshareId, page).subscribe((userPage: UserPage) => this.userPage = userPage);
  }

  getReadableDate(date: string): string {
    return DateUtil.formatReadableDate(new Date(date));
  }

  loadPreviousPage() {
    if (this.page > 0)
      this.page--;
    this.loadEligibleUsers(this.rshareId, this.page);
  }

  loadNextPage() {
    if (this.page < this.userPage.size)
      this.page++;
    this.loadEligibleUsers(this.rshareId, this.page);
  }

  toggleSelectedForPaymenet(userId: number) {
    this.payUserId = userId;
    this.showPay = !this.showPay;
  }

  payUser(formValues) {
    if (formValues.payAmount == null || formValues.payAmount < 500) {
      this.toastr.warning("Failed!", "Payment amount should be at least ৳500 or more!");
      return;
    }

    this.userService.payUsers(this.payUserId, this.rshareId, formValues.payAmount).subscribe(t => {
      this.toastr.success("Success!", "Payment (amount: " + formValues.payAmount + ") saved successfully." + t.explanation);
      this.showPay = false;
      this.loadEligibleUsers(this.rshareId, this.page);
      return t;
    }, err => {
      this.toastr.error("Failed!", "Failed to save payment. Reason is: " + err.code);
    });
    console.log(formValues);
  }
}
