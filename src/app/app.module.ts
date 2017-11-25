import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RouterModule} from '@angular/router';
import {appRoutes} from './route';

import {HttpModule} from '@angular/http';

import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { CtrlPanelContainerComponent } from './ctrl-panel-container/ctrl-panel-container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

import {LocalStorageModule} from 'angular-2-local-storage';
import { SignUpComponent } from './sign-up/sign-up.component';

import {UserService} from './shared/services/user.service';
import {Auth} from './shared/services/auth.service';
import {Storage} from './shared/services/storage.service';
import {ToastrService} from './shared/services/toaster.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    CtrlPanelContainerComponent,
    DashboardComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    LocalStorageModule.withConfig({
      prefix: 'rssmit',
      storageType: 'localStorage'
    }),
    FormsModule,
    HttpModule
  ],
  providers: [UserService,Auth,Storage,ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
