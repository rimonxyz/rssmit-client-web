import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {appRoutes} from './route';

import {HttpModule} from '@angular/http';

import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {NavComponent} from './nav/nav.component';
import {CtrlPanelContainerComponent} from './ctrl-panel-container/ctrl-panel-container.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';

import {SignUpComponent} from './sign-up/sign-up.component';

import {UserService} from './shared/services/user.service';
import {Auth} from './shared/services/auth.service';
import {ToastrService} from './shared/services/toastr.service';
import {LogoutComponent} from './logout/logout.component';
import {EventsComponent} from './events/events.component';
import {EventService} from "./shared/services/event.service";
import {RsharingService} from "./shared/services/rsharing.service";
import {TransactionService} from "./shared/services/transaction.service";
import {StatisticsService} from "./shared/services/stats.service";
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    CtrlPanelContainerComponent,
    DashboardComponent,
    LoginComponent,
    SignUpComponent,
    LogoutComponent,
    EventsComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule
  ],
  providers: [
    UserService,
    Auth,
    ToastrService,
    EventService,
    RsharingService,
    TransactionService,
    StatisticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
