import { Routes } from '@angular/router';
import { AdministrationLayoutComponent } from "./layouts/administration/administration-layout.component";
import { LoginComponent } from "./login/login.component";
import {HomeComponent} from "./home/home.component";

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        component: AdministrationLayoutComponent,
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