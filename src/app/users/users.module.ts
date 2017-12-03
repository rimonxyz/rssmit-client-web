import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {userRoutes} from "./users.route";
import {UsersComponent} from "./users/users.component";
import {EarningComponent} from './earning/earning.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [
    UsersComponent,
    EarningComponent
  ]
})
export class UsersModule {
}
