import {Component, OnInit} from '@angular/core';
import {Auth} from "../shared/services/auth.service";
import {ToastrService} from "../shared/services/toastr.service";
import {EventStats} from "../shared/model/event_stats.model";
import {EventService} from "../shared/services/event.service";
import {EventPage} from '../shared/model/event-page.model';
import {TransactionService} from "../shared/services/transaction.service";
import {TransactionPage} from "../shared/model/transaction-page.model";
import {DateUtil} from "../shared/utils/date.util";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  clientId: string;
  clientSecret: string;
  clientIdVisible: boolean;
  clientSecretVisible: boolean;

  eventStats: EventStats = new EventStats();
  period: string;

  eventsPage: EventPage = new EventPage();
  trnxPage: TransactionPage = new TransactionPage;

  constructor(private eventService: EventService,
              private trnxService: TransactionService,
              private toastr: ToastrService,
              private auth: Auth) {
  }

  ngOnInit() {
    this.clientId = this.auth.getClientId();
    this.clientSecret = this.auth.getClientSecret();

    // get event statistics
    this.loadEventStats();
    this.loadEventPage(0);
    this.loadTransactionPage(0);
  }

  loadEventStats():void {
    this.eventService.getEventStats(this.period).subscribe((e: EventStats) => this.eventStats = e, err => this.auth.refreshToken());
  }

  loadEventPage(page: number) {
    this.eventService.getEvents(0).subscribe(eventsPage => {
      this.eventsPage = eventsPage
      console.log(this.eventsPage);
    }, err => this.auth.refreshToken());
  }

  loadTransactionPage(page: number) {
    this.trnxService.getAllTransactionsForClient(page).subscribe((tPage: TransactionPage) => this.trnxPage = tPage, err => console.log(err));
  }

  onEventStatsPeriodChange(period: string): void{
    this.period = period;
    this.eventService.getEventStats(this.period).subscribe((e: EventStats) => this.eventStats = e, err => this.auth.refreshToken());
  }

  toggleClientIdVisibility(): void {
    this.clientIdVisible = !this.clientIdVisible;
  }

  toggleClientSecretVisibility(): void {
    this.clientSecretVisible = !this.clientSecretVisible;
  }

  copyToClipboard(val) {
    let selBox = document.createElement('textarea');

    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;

    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();

    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.toastr.success('Success!', 'Item Copied!');
  }
  getReadableDate(date: Date): string {
    return DateUtil.formatReadableDate(date);
  }

  getReadableDateTime(date: Date): string {
    return DateUtil.formatReadableDateTime(date);
  }

}
