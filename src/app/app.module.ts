import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'

import {AppComponent} from './app.component'
import {NotificationComponent} from './components/notification/notification.component'
import {WINDOW_PROVIDERS} from './services/window.service'
import {RouterModule, Routes} from "@angular/router";
import {VisitorsComponent} from "./layouts/visitors/visitors.component";
import {LoginActivate} from "./services/login-activate.service";
import {LoginComponent} from "./layouts/login/login.component";
import {HomeComponent} from "./layouts/home/home.component";
import {SignedInActivate} from "./services/signed-in-activate.service";

const appRoutes: Routes = [
    {path: '', component: HomeComponent, canActivate: [LoginActivate]},
    {path: 'visitors', component: VisitorsComponent, canActivate: [LoginActivate]},
    {path: 'login', component: LoginComponent, canActivate: [SignedInActivate]}
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,
        VisitorsComponent,
        LoginComponent,
        HomeComponent,
        NotificationComponent
    ],
    providers: [WINDOW_PROVIDERS, LoginActivate, SignedInActivate],
    bootstrap: [AppComponent]
})
export class AppModule {
}
