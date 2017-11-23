import { Component, OnInit } from '@angular/core';
import { UserService } from "../shared/services/user.service";
import {IUser} from "../shared/model/user.model";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  signUp(user){
    let userResponse : IUser =this.userService.register(user);
    console.log(userResponse);
  }
}
