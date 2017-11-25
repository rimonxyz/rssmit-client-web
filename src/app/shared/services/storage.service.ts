import {Injectable} from '@Angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {UserAuth} from '../model/user_auth.model';

@Injectable()
export class Storage{

    public KEYS: any = {
        clientId : "client_id",
        clientSecret: "client_secret",
        accessToken: "access_token",
        refreshToken: "refresh_token"
    }

    constructor(private localStorage: LocalStorageService){}

    put(key: string,value: string){
        this.localStorage.set(key,value);
    }

    retrive(key: string){
        return this.localStorage.get(key);
    }

    putAuth(userAuth: UserAuth){
        this.localStorage.set(this.KEYS.access_token,userAuth.access_token);
        this.localStorage.set(this.KEYS.refresh_token,userAuth.refresh_token);
    }
}