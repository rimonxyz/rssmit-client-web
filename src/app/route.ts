import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {LogoutComponent} from "./logout/logout.component";
import {Auth} from "./shared/services/auth.service";
import {EventsComponent} from "./events/events.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";

export const appRoutes: Routes = [
  {path: "dashboard", component: DashboardComponent, canActivate: [Auth]},
  {path: 'events', component: EventsComponent, canActivate: [Auth]},
  {path: '', redirectTo: "/dashboard", pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'rshare', loadChildren: 'app/rsharing/rsharing.module#RSharingModule', canActivate: [Auth]},
  {path: 'users', loadChildren: 'app/users/users.module#UsersModule', canActivate: [Auth]}
]
