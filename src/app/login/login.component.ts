import { Component, OnInit } from '@angular/core';
import {Auth} from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: Auth) { }

  ngOnInit() {
    
  }


  login(formValues: any){
    this.auth.login(formValues.username,formValues.password)
  }

}
