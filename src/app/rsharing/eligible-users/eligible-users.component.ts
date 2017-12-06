import {Component, OnInit} from '@angular/core';
import {UserPage} from "../../shared/model/user_page.model";
import {UserService} from "../../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {DateUtil} from "../../shared/utils/date.util";

@Component({
  selector: 'app-eligible-users',
  templateUrl: './eligible-users.component.html',
  styleUrls: ['./eligible-users.component.css']
})
export class EligibleUsersComponent implements OnInit {

  userPage: UserPage;
  page: number;
  rshareId: number;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.page = 0;
    this.rshareId = this.activatedRoute.snapshot.params['rshareId'];
    this.loadUsers(this.rshareId, this.page);
  }

  loadUsers(rshareId: number, page: number) {
    this.userService.getEligibleUsersForSharing(rshareId, page).subscribe((userPage: UserPage) => this.userPage = userPage);
  }

  getReadableDate(date: string): string {
    return DateUtil.formatReadableDate(new Date(date));
  }

  loadPreviousPage() {
    if (this.page > 0)
      this.page--;
    this.loadUsers(this.rshareId, this.page);
  }

  loadNextPage() {
    if (this.page < this.userPage.size)
      this.page++;
    this.loadUsers(this.rshareId, this.page);
  }

}
