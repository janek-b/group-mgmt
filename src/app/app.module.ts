import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MaterializeModule } from 'angular2-materialize';



import { routing } from './app.routing';
import { AuthService } from './auth.service';
import { DbService } from './db.service';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { BreadcrumbPipe } from './breadcrumb.pipe';
import { EventNewComponent } from './event-new/event-new.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { AttendingPipe } from './attending.pipe';
import { EventDatePipe } from './event-date.pipe';
import { AdminComponent } from './admin/admin.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { MemberRolePipe } from './member-role.pipe';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AboutComponent,
    MemberListComponent,
    MemberDetailComponent,
    MemberEditComponent,
    BreadcrumbPipe,
    EventNewComponent,
    EventListComponent,
    EventDetailComponent,
    AttendingPipe,
    EventDatePipe,
    AdminComponent,
    EventEditComponent,
    MemberRolePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterializeModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
