import {Routes} from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {EarningComponent} from "./earning/earning.component";
import {Auth} from "../shared/services/auth.service";
import {DevsComponent} from "./devs/devs.component";

export const userRoutes: Routes = [
  {path: '', component: UsersComponent, canActivate: [Auth]},
  {path: 'earnings/:userId', component: EarningComponent, canActivate: [Auth]},
  {path: 'devs', component: DevsComponent, canActivate: [Auth]}
];
