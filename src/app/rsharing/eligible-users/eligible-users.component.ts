import {Component, OnInit} from '@angular/core';
import {UserPage} from "../../shared/model/user_page.model";
import {UserService} from "../../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {DateUtil} from "../../shared/utils/date.util";
import {ToastrService} from "../../shared/services/toastr.service";
import {Auth} from "../../shared/services/auth.service";

@Component({
  selector: 'app-eligible-users',
  templateUrl: './eligible-users.component.html',
  styleUrls: ['./eligible-users.component.css']
})
export class EligibleUsersComponent implements OnInit {

  eligibleUsersPage: UserPage;
  euPage: number;

  alreadyPaidUsersPage: UserPage;
  apPage: number;

  rshareId: number;

  payUserId: number;
  showPay: boolean;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private auth: Auth) {
  }

  ngOnInit() {
    this.euPage = 0;
    this.apPage = 0;
    this.rshareId = this.activatedRoute.snapshot.params['rshareId'];
    this.loadEligibleUsers(this.rshareId, this.euPage);
    this.loadAlreadyPaidUsers(this.rshareId, this.apPage);
  }

  loadEligibleUsers(rshareId: number, page: number) {
    this.userService.getEligibleUsersForSharing(rshareId, page)
      .subscribe((userPage: UserPage) => this.eligibleUsersPage = userPage,err=>this.auth.refreshToken());
  }

  loadAlreadyPaidUsers(rshareId: number, page: number) {
    this.userService.getAlreadyPaidUsers(rshareId, page)
      .subscribe((userPage: UserPage) => this.alreadyPaidUsersPage = userPage,err=>console.log(err));
  }

  getReadableDate(date: string): string {
    return DateUtil.formatReadableDate(new Date(date));
  }

  loadEuPreviousPage() {
    if (this.euPage > 0)
      this.euPage--;
    this.loadEligibleUsers(this.rshareId, this.euPage);
  }

  loadEuNextPage() {
    if (this.euPage < this.eligibleUsersPage.size)
      this.euPage++;
    this.loadEligibleUsers(this.rshareId, this.euPage);
  }

  loadApPreviousPage() {
    if (this.apPage > 0)
      this.apPage--;
    this.loadAlreadyPaidUsers(this.rshareId, this.apPage);
  }

  loadApNextPage() {
    if (this.apPage < this.alreadyPaidUsersPage.size)
      this.apPage++;
    this.loadAlreadyPaidUsers(this.rshareId, this.apPage);
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
      this.loadEligibleUsers(this.rshareId, this.euPage);
      this.loadAlreadyPaidUsers(this.rshareId, this.apPage);
      return t;
    }, err => {
      this.toastr.warning("We\'re sorry..","We\'re working on it! Please try again in a little while. This time it won\'t happen I promise!");
      this.auth.refreshToken();
    });
    console.log(formValues);
  }
}
