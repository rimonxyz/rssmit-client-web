import {Component, OnInit, ViewChild} from '@angular/core';
import {AppsPage} from "../shared/model/apps_page.model";
import {AppsService} from "../shared/services/apps.service";
import {DateUtil} from "../shared/utils/date.util";
import {Apps} from "../shared/model/apps.model";
import {ToastrService} from "../shared/services/toastr.service";

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent implements OnInit {

  appsPage : AppsPage = new AppsPage();
  page: number;

  editMode: boolean = false;
  editModeAppId: number;

  @ViewChild('appId') appId: any;
  @ViewChild('appName') appName: any;
  @ViewChild('packageName') packageName: any;
  @ViewChild('categoryName') categoryName: any;


  constructor(private appsService: AppsService, private toastr: ToastrService) {
  }

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

  toggleEditMode(id: number) {
    this.editMode = !this.editMode;
    this.editModeAppId = id;
  }

  getApp(): Apps {
    let app: Apps = new Apps();
    app.id = this.appId.nativeElement.value;
    app.name = this.appName.nativeElement.value;
    app.packageName = this.packageName.nativeElement.value;
    app.categoryName = this.categoryName.nativeElement.value;
    return app;
  }

  isInEditMode(appId: number) {
    return appId == this.editModeAppId && this.editMode;
  }

  isAppValid(app: Apps): boolean {
    if (app == null || app.id == null) return false;
    if (app.name == null || app.name.length < 3)
      return false;
    if (app.packageName == null || app.packageName.length < 5)
      return false;
    if (app.categoryName == null || app.categoryName.toLowerCase().indexOf("select") != -1)
      return false;
    return true;
  }

  updateAppInfo() {
    let app: Apps = this.getApp();
    if (!this.isAppValid(app)) {
      this.toastr.error("Invalid App description!", "Please check if correct information's are provided.");
      return;
    }
    console.log(this.getApp());
    this.appsService.updateApp(app)
      .subscribe(r => {
        this.toastr.success("Success!", "Successfully Updated!");
        this.editMode = false;
        this.loadApps(this.page);
      }, err => console.log(err));
  }
}
