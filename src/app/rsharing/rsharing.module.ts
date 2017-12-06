import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RShareComponent} from './rshare/rshare.component';
import {RouterModule} from "@angular/router";
import {rsharingRoutes} from "./rsharing.route";
import {FormsModule} from "@angular/forms";
import { EligibleUsersComponent } from './eligible-users/eligible-users.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rsharingRoutes),
    FormsModule
  ],
  declarations: [RShareComponent, EligibleUsersComponent]
})
export class RSharingModule { }
