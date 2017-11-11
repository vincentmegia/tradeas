import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { ToolbarModule } from './shared/toolbar/toolbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { JournalComponent } from './journal/journal.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AddIDeaComponent } from './shared/add-idea/add-idea.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        UserComponent,
        JournalComponent,
        TypographyComponent,
        IconsComponent,
        NotificationsComponent,
        AddIDeaComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes),
        SidebarModule,
        ToolbarModule,
        FooterModule,
        FixedPluginModule,
        FormsModule
    ],
    exports: [
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
