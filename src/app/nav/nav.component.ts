import {Component, OnInit} from '@angular/core';
import {Auth} from "../shared/services/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private auth: Auth) {
  }

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  isLoggedInUserAdmin() {
    return Auth.isAdmin();
  }
}
