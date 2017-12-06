import {Routes} from '@angular/router';
import {RShareComponent} from "./rshare/rshare.component";
import {EligibleUsersComponent} from "./eligible-users/eligible-users.component";

export const rsharingRoutes: Routes = [
  {path: '', component: RShareComponent},
  {path: ':rshareId/eUsers', component: EligibleUsersComponent}
]
