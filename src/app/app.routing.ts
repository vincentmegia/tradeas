import { Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
//import { JournalComponent }   from './journal/journal.component';
import { TypographyComponent }   from './typography/typography.component';
import { VolumeComponent }   from './volume/volume.component';
import { NotificationsComponent }   from './notifications/notifications.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    /*{
        path: 'journal',
        component: JournalComponent
    },*/
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'volume',
        component: VolumeComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    }
];