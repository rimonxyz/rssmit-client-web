import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private accessToken: string;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.localStorageService.add("accessToken","36473hjvrbidkks746kb,cskjd");
    this.accessToken = this.localStorageService.get("accessToken") as string;    
  }

}
