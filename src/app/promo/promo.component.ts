import {Component, OnInit} from '@angular/core';
import {PromosPage} from "../shared/model/promos_page.model";
import {PromosService} from "../shared/services/promos.service";
import {DateUtil} from "../shared/utils/date.util";
import {Promo} from "../shared/model/promo.model";
import {ToastrService} from "../shared/services/toastr.service";
import {Auth} from "../shared/services/auth.service";

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {
  title: string;
  promoUrl: string;
  description: string;

  promosPage: PromosPage = new PromosPage();
  page: number;

  constructor(private promosService: PromosService,
              private toastr: ToastrService,
              private auth: Auth) {
  }

  ngOnInit() {
    this.page = 0;
    this.loadPromos(this.page);
  }

  private loadPromos(page: number) {
    this.promosService.getAllPromos(page).subscribe((promosPage: PromosPage) => this.promosPage = promosPage, err => this.auth.refreshToken());
  }

  getReadableDate(date: Date): string {
    return DateUtil.formatReadableDateTime(date);
  }

  loadNextPage() {
    if (this.page < this.promosPage.totalPages)
      this.page++;
    this.loadPromos(this.page);
  }

  loadPreviousPage() {
    if (this.page > 0)
      this.page--;
    this.loadPromos(this.page);
  }

  toggleActive(promo: Promo) {
    this.promosService.togglePromo(promo).subscribe(r => this.loadPromos(this.page), err => console.log(err));
  }

  createPromotion(formValues) {
    let promo: Promo = new Promo();
    promo.title = formValues.title;
    promo.url = formValues.promoUrl;
    promo.description = formValues.description;
    this.promosService.createPromo(promo).subscribe(res=>{
      this.toastr.success("Success!","Promo created!");
      this.loadPromos(this.page);
    },err=>console.log(err));
  }
}
