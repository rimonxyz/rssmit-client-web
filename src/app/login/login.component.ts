import {Component, OnInit} from '@angular/core';
import {Auth} from '../shared/services/auth.service';
import {UserService} from "../shared/services/user.service";
import {ToastrService} from "../shared/services/toastr.service";
import {Router} from "@angular/router";

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

  constructor(private auth: Auth, private userService: UserService, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit() {

  }

  login(formValues: any){
    this.auth.login(formValues.username,formValues.password)
  }

  onResetPassword(formValues) {
    this.userService.sendVerificationEmail(formValues.email).subscribe(result => {
      this.emailSent = true;
    }, err => console.log(err));

  }

  onTokenEntered(formValues) {
    this.userService.verifyToken(formValues.token).subscribe(result => this.tokenVerified = true, err => console.log(err));
  }

  onTokenVerified(formValues) {
    console.log(formValues)
    this.passwordMatches = formValues.password.length >= 6 && formValues.password === formValues.confirmPassword;
    if (!this.passwordMatches) return;
    this.userService.resetPassword(formValues.password).subscribe(result => {
      jQuery("#confirmEmailModal").modal("hide");
      this.toastr.success("Success!", "Password reset successful!");
      this.router.navigate(['/login']);
    });
  }
}
