import { Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
//import { JournalComponent }   from './journal/journal.component';
import { TypographyComponent }   from './typography/typography.component';
import { VolumeComponent }   from './volume/volume.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import {AdminLayoutComponent} from "./layouts/admin/admin-layout.component";
import {AuthLayoutComponent} from "./layouts/auth/auth-layout.component";

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'volume',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AdminLayoutComponent,
        children: [{
            path: '',
            loadChildren: './volume/volume.module#VolumeModule'
        }]
    },
    /*{
        path: '',
            component: AuthLayoutComponent,
            children: [{
            path: 'pages',
            loadChildren: './pages/pages.module#PagesModule'
    }]
    }*/
];