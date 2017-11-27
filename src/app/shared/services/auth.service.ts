import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ClientDetails} from '../model/client_details.model';
import {UserAuth} from '../model/user_auth.model';
import {LocalStorage} from './local-storage.service';
import {ToastrService} from './toastr.service';
import {CanActivate, Router} from "@angular/router";


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


  getLoginUrl(username: string, password: string, clientId: string, clientSecret: string): string {
    return 'http://172.104.166.238:9090/oauth/token?grant_type=password&client_id=' + clientId + '&client_secret=' + clientSecret + '&username=' + username + '&password=' + password;
  }


  getClientCredentials(username: string, password: string): Observable<ClientDetails> {
    return this.http.get(this.getClientCredentialsUrl(username, password)).map((user: Response) => <ClientDetails>user.json()).catch(this.handleError);
  }

  private getClientCredentialsUrl(username: string, password: string) {
    return 'http://172.104.166.238:9090/dev/client/credentials?username=' + username + '&password=' + password;
  }


  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
