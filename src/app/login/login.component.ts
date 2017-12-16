import {Component, OnInit} from '@angular/core';
import {Auth} from '../shared/services/auth.service';
import {UserService} from "../shared/services/user.service";
import {ToastrService} from "../shared/services/toastr.service";
import {Router} from "@angular/router";
import {Commons} from "../shared/utils/commons.util";

declare let jQuery: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  emailSent: boolean;
  tokenVerified: boolean;
  passwordMatches: boolean;

  token: string;

  constructor(private auth: Auth,
              private userService: UserService,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.auth.isLoggedIn())
      this.router.navigate(['/dashboard']);

    let verify = Commons.getUrlParam('verify', window.location);
    if (verify == null || verify === '') return;
    if (verify == 'true') this.toastr.success("Verified!", "Please login to continue.");
    else this.toastr.error("Failed!", "Could not verify!");
  }

  login(formValues: any){
    this.auth.login(formValues.username,formValues.password)
  }


  // PASSWORD RESET
  onResetPassword(formValues) {
    this.userService.sendVerificationEmail(formValues.email).subscribe(result => {
      this.emailSent = true;
    }, err => console.log(err));

  }

  onTokenEntered(formValues) {
    this.userService.verifyToken(formValues.token).subscribe(result => {
      this.tokenVerified = true;
      this.token = result;
      console.log("TokenVerified:" + result);
    }, err => console.log("error" + err.code));
  }

  onTokenVerified(formValues) {
    console.log(formValues)
    this.passwordMatches = formValues.password.length >= 6 && formValues.password === formValues.confirmPassword;
    if (!this.passwordMatches) return;
    this.userService.resetPassword(this.token, formValues.password).subscribe(result => {
      jQuery("#confirmEmailModal").modal("hide");
      this.toastr.success("Success!", "Password reset successful!");
      this.router.navigate(['/login']);
    });
  }

  matchPassword(formValues) {
    this.passwordMatches = formValues.password.length >= 6 && formValues.password === formValues.confirmPassword;
  }

}
