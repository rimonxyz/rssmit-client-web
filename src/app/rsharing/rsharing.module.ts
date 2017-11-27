import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateRShareComponent} from './create-rshare/create-rshare.component';
import {RouterModule} from "@angular/router";
import {rsharingRoutes} from "./rsharing.route";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rsharingRoutes)
  ],
  declarations: [CreateRShareComponent]
})
export class RSharingModule { }
