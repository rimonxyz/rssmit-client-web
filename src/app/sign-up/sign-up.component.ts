import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {IUser} from "../shared/model/user.model";
import {Observable} from "rxjs/Rx";
import {Router} from "@angular/router";
import {IUserBind} from '../shared/model/user-bind.model';
import {ToastrService} from '../shared/services/toastr.service';
import {Auth} from "../shared/services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;

  constructor(private auth: Auth,
              private userService: UserService,
              private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit() {
    if (this.auth.isLoggedIn())
      this.router.navigate(['/dashboard']);
  }

  signUp(user: IUserBind){
    let userResponse : Observable<IUser> =this.userService.register(user);
    userResponse.subscribe(u=>{
      this.router.navigate(["/login"]);
      this.toastrService.success("Please verify you email", "An email has been sent to your address. Please click the link to verify your account.");
    },err=>{
      this.toastrService.error("Failed!", "Could not sign up. Please provide valid informations!");
    });
  }
}
