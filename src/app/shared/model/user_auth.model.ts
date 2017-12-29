import {Authority} from "./authority.model";

export class UserAuth{
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope:string;
  username: string;
  authorities: Authority[];
}
