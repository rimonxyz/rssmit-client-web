import {Routes} from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {EarningComponent} from "./earning/earning.component";
import {Auth} from "../shared/services/auth.service";

export const userRoutes: Routes = [
  {path: '', component: UsersComponent, canActivate: [Auth]},
  {path: 'earnings/:userId', component: EarningComponent, canActivate: [Auth]}
];
