import {Component, OnInit} from '@angular/core';
import {RSharedPage} from "../../shared/model/rshared_page.model";
import {RsharingService} from "../../shared/services/rsharing.service";
import {ToastrService} from "../../shared/services/toastr.service";
import {Auth} from "../../shared/services/auth.service";
import {DateUtil} from "../../shared/utils/date.util";
import {RShared} from "../../shared/model/rshared.model";

@Component({
  selector: 'app-rshare-requests',
  templateUrl: './rshare-requests.component.html',
  styleUrls: ['./rshare-requests.component.css']
})
export class RshareRequestsComponent implements OnInit {

  inActiveRSharedPage: RSharedPage;
  activeRSharedPage: RSharedPage;
  iPage: number;
  aPage: number;

  constructor(private rsharingService: RsharingService,
              private toastr: ToastrService,
              private auth: Auth) {
  }

  ngOnInit() {
    this.iPage = 0;
    this.aPage = 0;

    this.fetchInActiveRSharedPage(this.iPage);
    this.fetchActiveRSharedPage(this.aPage);
  }


  fetchActiveRSharedPage(page: number) {
    this.rsharingService.getRSharedListByStatusPaginated(true, page).subscribe((rsp: RSharedPage) => {
      this.activeRSharedPage = rsp;
      console.log(this.activeRSharedPage);
    }, err => {
      this.auth.refreshToken();
    });
  }


  fetchInActiveRSharedPage(page: number) {
    this.rsharingService.getRSharedListByStatusPaginated(false, page).subscribe((rsp: RSharedPage) => {
      this.inActiveRSharedPage = rsp;
      console.log(this.inActiveRSharedPage);
    }, err => {
      this.auth.refreshToken();
    });
  }

  loadInActivePreviousPage(): void {
    if (this.iPage > 0)
      this.iPage--;
    this.fetchInActiveRSharedPage(this.iPage)
  }

  loadInActiveNextPage(): void {
    if (this.iPage < this.inActiveRSharedPage.totalPages)
      this.iPage++;
    this.fetchInActiveRSharedPage(this.iPage);
  }

  loadActivePreviousPage(): void {
    if (this.aPage > 0)
      this.aPage--;
    this.fetchActiveRSharedPage(this.aPage);
  }

  loadActiveNextPage(): void {
    if (this.aPage < this.activeRSharedPage.totalPages)
      this.aPage++;
    this.fetchActiveRSharedPage(this.aPage);
  }

  getReadableDate(date: string): string {
    let d = new Date(date);
    return DateUtil.formatReadableDate(d);
  }

  activateSharedEntity(rshareId: number) {
    let confirm: boolean = window.confirm("Are you sure?");
    if (confirm) {
      this.rsharingService.activateRSharedEntity(rshareId)
        .subscribe((rshare: RShared) => {
          this.fetchInActiveRSharedPage(this.iPage);
          this.fetchActiveRSharedPage(this.aPage);
          this.toastr.success("Success!", "Successfully activated shared entity " + rshare.id + " !");
        }, err => this.toastr.error('errr', err.message));
    }
  }
}
