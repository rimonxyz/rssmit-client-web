import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RShareComponent} from './rshare/rshare.component';
import {RouterModule} from "@angular/router";
import {rsharingRoutes} from "./rsharing.route";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rsharingRoutes),
    FormsModule
  ],
  declarations: [RShareComponent]
})
export class RSharingModule { }
