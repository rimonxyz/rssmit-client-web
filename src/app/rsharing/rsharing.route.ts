import {Routes} from '@angular/router';
import {RShareComponent} from "./rshare/rshare.component";
import {EligibleUsersComponent} from "./eligible-users/eligible-users.component";
import {Auth} from "../shared/services/auth.service";
import {PaymentRequestsComponent} from "./payment-requests/payment-requests.component";
import {RshareRequestsComponent} from "./rshare-requests/rshare-requests.component";

export const rsharingRoutes: Routes = [
  {path: '', component: RShareComponent, canActivate: [Auth]},
  {path: ':rshareId/eUsers', component: EligibleUsersComponent, canActivate: [Auth]},
  {path: 'payments/requests', component: PaymentRequestsComponent, canActivate: [Auth]},
  {path: 'requests', component: RshareRequestsComponent, canActivate: [Auth]}
]
