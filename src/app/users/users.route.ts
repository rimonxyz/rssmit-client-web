import {Routes} from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {EarningComponent} from "./earning/earning.component";

export const userRoutes: Routes = [
  {path: '', component: UsersComponent},
  {path: 'earnings/:userId', component: EarningComponent}
];
