import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {UserPage} from "../../shared/model/user_page.model";
import {DateUtil} from "../../shared/utils/date.util";
import {Router} from "@angular/router";
import {Auth} from "../../shared/services/auth.service";
import {NotificationService} from "../../shared/services/notification.service";
import {ToastrService} from "../../shared/services/toastr.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userPage: UserPage;
  page: number;

  recipientId: number;

  constructor(private userService: UserService,
              private router: Router,
              private notificationService: NotificationService,
              private toastr: ToastrService,
              private auth: Auth) {
  }

  ngOnInit() {
    this.page = 0;
    this.loadUsers(this.page);
  }

  loadUsers(page: number) {
    this.userService.getUsers(page).subscribe((userPage: UserPage) => this.userPage = userPage,err=>this.auth.refreshToken());
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

  onEnterPressed(query: string) {
    this.userService.searchUsers(query, this.page).subscribe((userPage: UserPage) => this.userPage = userPage, err => this.auth.refreshToken());
  }

  setRecipient(id: number) {
    this.recipientId = id;
  }

  sendNotification(notification: any) {
    this.notificationService.postNotification(this.recipientId,notification).subscribe(response => {
      console.log(response);
    }, err => console.log(err));
  }
}
