import {Injectable} from "@angular/core";
import { IUserBind } from "../model/user-bind.model";
import {IUser} from "../model/user.model";

@Injectable()
export class UserService{
    userResponse: IUser;

    register(user: IUserBind): IUser{
        this.userResponse = {
            id:232,
            email : "user.email",
            name : "user.name",
            username : "user.username",
            password : "user.password",
            accountNonExpired : true,
            enabled : true,
            accountNonLocked : true,
            credentialsNonExpired : true,
            created : "23748993",
            lastUpdated : "23748993"
        };
        return this.userResponse;
    }


}