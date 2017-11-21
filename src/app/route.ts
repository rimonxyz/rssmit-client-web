
import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';

export const appRoutes: Routes = [
    {path:"dashboard", component: DashboardComponent},
    {path:'',redirectTo:"/dashboard",pathMatch:'full'},
    {path:'login', component:LoginComponent}
]