import {Routes} from '@angular/router';
import {RShareComponent} from "./rshare/rshare.component";
import {EligibleUsersComponent} from "./eligible-users/eligible-users.component";
import {Auth} from "../shared/services/auth.service";

export const rsharingRoutes: Routes = [
  {path: '', component: RShareComponent, canActivate: [Auth]},
  {path: ':rshareId/eUsers', component: EligibleUsersComponent, canActivate: [Auth]}
]
