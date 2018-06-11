import {Component, OnInit} from '@angular/core';
import {CredentialsService} from "../../shared/services/credentials.service";
import {Credentials} from "../../shared/model/credentials.model";
import {Auth} from "../../shared/services/auth.service";
import {ToastrService} from "../../shared/services/toastr.service";

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {

  credentials: Credentials;
  clientId: string;
  clientSecret: string;
  firebaseServerKey: string;

  constructor(private credentialsService: CredentialsService, private auth: Auth, private toastr: ToastrService) {
    this.credentials = new Credentials;
  }

  ngOnInit() {
    this.loadCredentials();
  }

  saveCredentials(formValues: any) {
    let credentials = new Credentials();
    credentials.clientId = formValues.clientId;
    credentials.clientSecret = formValues.clientSecret;
    credentials.firebaseServerKey = formValues.firebaseServerKey;
    this.credentialsService.postCredentials(credentials).subscribe(credentials => {
      this.credentials = credentials;
      this.toastr.success('Success!','Successfully saved credentials');
    }, err => this.auth.refreshToken());
  }

  private loadCredentials() {
    this.credentialsService.getCredentials().subscribe(credentials => {
      this.credentials = credentials;
    }, err => this.auth.refreshToken());
  }
}
