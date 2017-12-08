import {UserAuth} from '../model/user_auth.model';

export class LocalStorage{

  public static KEYS: any = {
        clientId : "client_id",
        clientSecret: "client_secret",
        accessToken: "access_token",
        refreshToken: "refresh_token"
  }

  constructor() {
  }

  static put(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  static retrive(key: string) {
    return localStorage.getItem(key);
  }

  static putAuth(userAuth: UserAuth) {
    localStorage.setItem(this.KEYS.accessToken, userAuth.access_token);
    localStorage.setItem(this.KEYS.refreshToken, userAuth.refresh_token);
  }

  static clear(): void {
    localStorage.removeItem(this.KEYS.accessToken);
    localStorage.removeItem(this.KEYS.refreshToken);
    localStorage.removeItem(this.KEYS.clientId);
    localStorage.removeItem(this.KEYS.clientSecret)
  }
}
