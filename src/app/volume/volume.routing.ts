import { Routes } from '@angular/router';
import { VolumeComponent } from "./volume.component";

export const VolumeRoutes: Routes = [{

    path: '',
    children: [ {
        path: 'volume',
        component: VolumeComponent
    }]
}];
