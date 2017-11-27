import {Component, OnInit} from '@angular/core';
import {Auth} from "../shared/services/auth.service";
import {LocalStorage} from "../shared/services/local-storage.service";
import {ToastrService} from "../shared/services/toastr.service";

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

  constructor(private storage: LocalStorage,private toastr: ToastrService,private auth: Auth) {
  }

  ngOnInit() {
    this.clientId = this.storage.retrive(this.storage.KEYS.clientId)+'';
    this.clientSecret = this.storage.retrive(this.storage.KEYS.clientSecret)+'';

  }

  toggleClientIdVisibility(): void{
    this.clientIdVisible = !this.clientIdVisible;
  }

  toggleClientSecretVisibility(): void{
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

    this.toastr.success('Success!','Item Copied!');
  }


}
