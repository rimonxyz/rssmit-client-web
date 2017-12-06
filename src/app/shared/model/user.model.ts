export interface IUser{

    id?: number;
    name: string;
    email: string;
    username: string;
    password: string;
    enabled: boolean;
    currentBalance: number;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    created: Date;
    lastUpdated: Date;
}
