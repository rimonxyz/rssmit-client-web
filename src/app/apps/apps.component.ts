import { Component, OnInit } from '@angular/core';
import {AppsPage} from "../shared/model/apps_page.model";
import {AppsService} from "../shared/services/apps.service";
import {DateUtil} from "../shared/utils/date.util";

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent implements OnInit {

  appsPage : AppsPage = new AppsPage();
  page: number;

  constructor(private appsService: AppsService) { }

  ngOnInit() {
    this.page = 0;
    this.loadApps(this.page);
  }

  private loadApps(page: number) {
    this.appsService.getMyApps(page).subscribe((appsPage: AppsPage)=> this.appsPage = appsPage,err=>console.log(err));
  }

  getReadableDate(date: Date): string {
    return DateUtil.formatReadableDateTime(date);
  }

  loadNextPage() {
    if (this.page < this.appsPage.totalPages)
      this.page++;
    this.loadApps(this.page);
  }

  loadPreviousPage() {
    if (this.page > 0)
      this.page--;
    this.loadApps(this.page);
  }
}
