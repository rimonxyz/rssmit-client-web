import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ClientDetails} from '../model/client_details.model';
import {UserAuth} from '../model/user_auth.model';
import {LocalStorage} from './local-storage.service';
import {ToastrService} from './toastr.service';
import {CanActivate, Router} from "@angular/router";
import {ApiEndpoints} from "./api.endpoints";


@Injectable()
export class Auth implements CanActivate{

  constructor(private http: Http, private storage: LocalStorage, private toastr: ToastrService, private router: Router) {
  }

  canActivate(): boolean{
    const loggedIn: boolean = this.isLoggedIn();

    if (loggedIn==false){
      this.toastr.error('You are logged out','Please login to continue!');
      this.router.navigate(['/login']);
    }
    return loggedIn;
  }

  isLoggedIn(): boolean {
    return this.storage.retrive(this.storage.KEYS.accessToken) != null;
  }

  logout():void{
    this.storage.clear();
    this.toastr.warning('You\'ve been logged out!','Please login to continue.');
    this.router.navigate(['/login']);
  }

  login(username: string, password: string) {
    return this.getClientCredentials(username, password).subscribe(clientDetails => {
      // save client id and secret to local storage
      this.storage.put(this.storage.KEYS.clientId,clientDetails.clientId);
      this.storage.put(this.storage.KEYS.clientSecret,clientDetails.clientSecret);

      const loginUrl: string = this.getLoginUrl(username, password, clientDetails.clientId, clientDetails.clientSecret);
      const userAuth: Observable<UserAuth> = this.http.get(loginUrl).map((response: Response) => <UserAuth>response.json()).catch(this.handleError);
      userAuth.subscribe(userAuth => {
        this.storage.putAuth(userAuth);
        this.toastr.success('Success', 'Successfully logged in!');
        this.router.navigate(['/dashboard']);
        window.location.href = "/dashboard";
      });
    },e=>{
      this.logout();
      this.toastr.error('Failed!','Invalid username/email or password.');
      this.router.navigate(['/login']);
    });
  }

  refreshToken() {
    const userAuth: Observable<UserAuth> = this.http.get(this.getRefreshTokenUrl()).map((response: Response) => <UserAuth>response.json()).catch(this.handleError);
    userAuth.subscribe((userAuth: UserAuth)=>{
      this.storage.putAuth(userAuth);
      this.router.navigate(['/dashboard'])
      this.toastr.success("Refresh Token","Token has been refreshed!");
    },err=>this.logout());
  }

  getAccessToken(): string{
    return <string>this.storage.retrive(this.storage.KEYS.accessToken);
  }

  getRefreshToken(): string{
    return <string>this.storage.retrive(this.storage.KEYS.refreshToken);
  }

  getClientId(): string {
    return <string>this.storage.retrive(this.storage.KEYS.clientId);
  }

  getClientSecret(): string {
    return <string>this.storage.retrive(this.storage.KEYS.clientSecret);
  }

  getLoginUrl(username: string, password: string, clientId: string, clientSecret: string): string {
    return ApiEndpoints.BASE_URL + '/oauth/token?grant_type=password&client_id=' + clientId + '&client_secret=' + clientSecret + '&username=' + username + '&password=' + password;
  }

  getRefreshTokenUrl(): string {
    return ApiEndpoints.BASE_URL + '/oauth/token?grant_type=refresh_token&client_id=' + this.getClientId() + '&client_secret=' + this.getClientSecret() + '&refresh_token=' + this.getRefreshToken();
  }


  getClientCredentials(username: string, password: string): Observable<ClientDetails> {
    return this.http.get(this.getClientCredentialsUrl(username, password)).map((user: Response) => <ClientDetails>user.json()).catch(this.handleError);
  }

  private getClientCredentialsUrl(username: string, password: string) {
    return ApiEndpoints.BASE_URL + '/dev/client/credentials?username=' + username + '&password=' + password;
  }


  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
