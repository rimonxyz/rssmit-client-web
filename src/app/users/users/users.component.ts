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
  topic: string;
  title: string;
  message: string;
  notificationType: string;

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
    if (!notification.title || !notification.message || !notification.notificationType) {
      this.toastr.warning("All fields are required!", "Please fill up the form accordingly.");
      return;
    }
    this.notificationService.postNotification(this.recipientId, notification).subscribe(response => {
      this.refresh();
    }, err => console.log("error: " + err));

  }
  sendNotificationToTopic(notification: any) {
    if (!notification.title || !notification.message || !notification.notificationType || !notification.topic) {
      this.toastr.warning("All fields are required!", "Please fill up the form accordingly.");
      return;
    }
    this.notificationService.postNotificationToTopic(notification).subscribe(response => {
      this.refresh();
    }, err => console.log("error: " + err));

  }

  refresh(): void {
    window.location.reload();
  }

}
