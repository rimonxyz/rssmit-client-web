export class ClientDetails{
    clientId: string;
    clientSecret: string;
    scope: string;
    grantTypes: string;
    authorities: string
    accessTokenValidity: number;
    refreshTokenValidity: number;
    additionalInfo: string;
}