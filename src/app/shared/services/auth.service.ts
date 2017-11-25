import { Injectable } from "@angular/core";
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ClientDetails} from '../model/client_details.model';
import {UserAuth} from '../model/user_auth.model';
import {Storage} from './storage.service';
import {ToastrService} from './toaster.service';

@Injectable()
export class Auth{
    
    constructor(private http: Http,private storage: Storage,private toastrService: ToastrService){}

    login(username: string,password: string){
        return this.getClientCredentials(username,password).subscribe(clientDetails=>{
            console.log(clientDetails);
            let loginUrl: string = this.getLoginUrl(username,password,clientDetails.clientId,clientDetails.clientSecret);
            let userAuth: Observable<UserAuth> =this.http.get(loginUrl).map((response: Response)=><UserAuth>response.json()).catch(this.handleError);
            userAuth.subscribe(userAuth=>{
                this.storage.putAuth(userAuth);
                console.log(userAuth);
                this.toastrService.success("Success","Successfully logged in!");
            })
        })
    }


    getLoginUrl(username:string, password:string, clientId: string, clientSecret: string): string{
        return "http://172.104.166.238:9090/oauth/token?grant_type=password&client_id="+clientId+"&client_secret="+clientSecret+"&username="+username+"&password="+password;
    }


    getClientCredentials(username: string,password: string): Observable<ClientDetails>{
        return this.http.get(this.getClientCredentialsUrl(username,password)).map((user:Response)=><ClientDetails>user.json()).catch(this.handleError);
    }

    private getClientCredentialsUrl(username: string,password: string){
        return "http://172.104.166.238:9090/dev/client/credentials?username="+username+"&password="+password;
    }


    private handleError(error: Response){
        return Observable.throw(error.statusText);
    }

}