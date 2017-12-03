import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserRev} from "../../shared/model/user-rev.model";
import {RsharingService} from "../../shared/services/rsharing.service";
import {DateUtil} from "../../shared/utils/date.util";

@Component({
  selector: 'app-earning',
  templateUrl: './earning.component.html',
  styleUrls: ['./earning.component.css']
})
export class EarningComponent implements OnInit {

  userId: number;
  userRev: UserRev;

  month: string;
  year: string;

  constructor(private activatedRoute: ActivatedRoute, private rSharingService: RsharingService) {
  }

  ngOnInit() {
    this.userId = +this.activatedRoute.snapshot.params['userId'];
    let currentDate: Date = new Date();
    this.month = DateUtil.monthNames[currentDate.getMonth()].toLocaleLowerCase();
    this.year = currentDate.getFullYear() + "";
    this.loadSingleUserRevenue(this.userId, this.month, this.year);
  }

  loadSingleUserRevenue(userId: number, month: string, year: string) {
    this.rSharingService.getSingleUserRevenue(userId,month, year).subscribe(r => this.userRev = r);
  }

  onMonthInputChange(month: string): void {
    this.month = month;
    this.loadSingleUserRevenue(this.userId, this.month, this.year);
    console.log(this.userRev);
  }

  onYearInputChange(year: string): void {
    this.year = year;
    console.log(year);
    this.loadSingleUserRevenue(this.userId, this.month, this.year);
    console.log(this.userRev);
  }
}
