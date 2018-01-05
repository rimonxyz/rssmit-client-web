import { Component, OnInit } from '@angular/core';
import {UserPage} from "../../shared/model/user_page.model";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";
import {Auth} from "../../shared/services/auth.service";
import {DateUtil} from "../../shared/utils/date.util";

@Component({
  selector: 'app-devs',
  templateUrl: './devs.component.html',
  styleUrls: ['./devs.component.css']
})
export class DevsComponent implements OnInit {
  userPage: UserPage;
  page: number;

  constructor(private userService: UserService,
              private router: Router,
              private auth: Auth) {
  }

  ngOnInit() {
    this.page = 0;
    this.loadUsers(this.page);
  }

  loadUsers(page: number) {
    this.userService.getDevelopers(page).subscribe((userPage: UserPage) => this.userPage = userPage,err=>this.auth.refreshToken());
  }

  getReadableDate(date: string): string {
    return DateUtil.formatReadableDate(new Date(date));
  }

  loadPreviousPage() {
    if (this.page > 0)
      this.page--;
    this.loadUsers(this.page)
  }

  loadNextPage() {
    if (this.page < this.userPage.size)
      this.page++;
    this.loadUsers(this.page);
  }

  loadEarnings(userId: Number) {
    this.router.navigate([''])
  }

}
