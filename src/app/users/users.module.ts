import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {userRoutes} from "./users.route";
import {UsersComponent} from "./users/users.component";
import {EarningComponent} from './earning/earning.component';
import { DevsComponent } from './devs/devs.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [
    UsersComponent,
    EarningComponent,
    DevsComponent
  ]
})
export class UsersModule {
}
