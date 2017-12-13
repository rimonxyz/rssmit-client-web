import {Component, OnInit} from '@angular/core';
import {Auth} from "../shared/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: Auth) { }

  ngOnInit() {
  }

  isLoggedIn():boolean{
    return this.auth.isLoggedIn();
  }

  getUsername(): string {
    if (this.isLoggedIn())
      return this.auth.getUsername();
    return "";
  }
}
