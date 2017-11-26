import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {LogoutComponent} from "./logout/logout.component";

export const appRoutes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  {path: '', redirectTo: "/dashboard", pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'logout', component: LogoutComponent}
]
