import {UserAuth} from '../model/user_auth.model';

export class LocalStorage{

  public static KEYS: any = {
    clientId: "*&^%&%G765bibi^87i5",
    clientSecret: "V%$#564Vu56%786v*7i6",
    accessToken: "B57UB5&i6u765&5b&*6",
    refreshToken: "INB*5B&U4^345%36^5u",
    authorities: "BU&46^&v3$76u%^&*",
    username: "B^4^3&463b8575it"
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
    localStorage.setItem(this.KEYS.authorities, JSON.stringify(userAuth.authorities));
    localStorage.setItem(this.KEYS.username, userAuth.username);
  }

  static clear(): void {
    localStorage.removeItem(this.KEYS.accessToken);
    localStorage.removeItem(this.KEYS.refreshToken);
    localStorage.removeItem(this.KEYS.clientId);
    localStorage.removeItem(this.KEYS.clientSecret)
  }
}
