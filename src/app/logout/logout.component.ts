import { Component, OnInit } from '@angular/core';
import {Auth} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "../shared/services/toastr.service";

@Component({
  template : `
    
  `
})
export class LogoutComponent implements OnInit {

  constructor(private auth: Auth,private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.auth.logout();
    this.router.navigate(['/login']);
    this.toastr.success('Success','You\'ve been successfully logged out!');
  }

}
