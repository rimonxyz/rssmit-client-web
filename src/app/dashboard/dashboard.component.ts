import {Component, OnInit} from '@angular/core';
import {Auth} from "../shared/services/auth.service";
import {ToastrService} from "../shared/services/toastr.service";
import {Statistics} from "../shared/model/stats.model";
import {EventService} from "../shared/services/event.service";
import {EventPage} from '../shared/model/event-page.model';
import {TransactionService} from "../shared/services/transaction.service";
import {TransactionPage} from "../shared/model/transaction-page.model";
import {DateUtil} from "../shared/utils/date.util";
import {StatisticsService} from "../shared/services/stats.service";

declare let google: any;

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

  stats: Statistics = new Statistics();
  period: string;

  eventsPage: EventPage = new EventPage();
  trnxPage: TransactionPage = new TransactionPage;

  constructor(private eventService: EventService,
              private trnxService: TransactionService,
              private statsService: StatisticsService,
              private toastr: ToastrService,
              private auth: Auth) {
  }

  ngOnInit() {
    this.clientId = this.auth.getClientId();
    this.clientSecret = this.auth.getClientSecret();

    // get event statistics
    this.loadStats(this.period);
    this.loadEventPage(0);
    this.loadTransactionPage(0);
  }

  loadStats(period: string): void {
    this.statsService.getStatistics(period).subscribe((s: Statistics) => {
      this.stats = s;
      this.loadPiChart(this.stats);
    }, err => this.auth.refreshToken());
  }

  loadEventPage(page: number) {
    this.eventService.getEvents(0).subscribe(eventsPage => {
      this.eventsPage = eventsPage
    }, err => this.auth.refreshToken());
  }

  loadTransactionPage(page: number) {
    this.trnxService.getAllTransactionsForClient(page).subscribe((tPage: TransactionPage) => this.trnxPage = tPage, err => console.log(err));
  }

  onEventStatsPeriodChange(period: string): void{
    this.period = period;
    this.loadStats(this.period);
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

  loadPiChart(stats: Statistics) {

    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages': ['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.

    function drawChart() {
      console.log('Before Loading:' + stats.totalSharedAmount + ":" + stats.totalLiability);

      // Create the data table.
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Slices');
      data.addRows([
        ['Total Paid', stats.totalSharedAmount - stats.totalLiability],
        ['Total Liability', stats.totalLiability]
      ]);

      // Set chart options
      var options = {
        'legend': 'right',
        'title': '',
        'height': 340
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('pi_chart_div'));
      chart.draw(data, options);
    }
  }
}
