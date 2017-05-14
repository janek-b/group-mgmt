import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { EventNewComponent } from './event-new/event-new.component';

const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'members',
    component: MemberListComponent
  },
  {
    path: 'members/:memberId',
    component: MemberDetailComponent
  },
  {
    path: 'events',
    component: EventNewComponent
  },
  {
    path: 'events/new',
    component: EventNewComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
