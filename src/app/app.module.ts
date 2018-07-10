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
import { VolumeComponent } from './volume/volume.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { IdeaComponent } from './journal/idea/idea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
    TypeaheadModule, 
    PaginationModule, 
    BsDatepickerModule, 
    ModalModule,
    BsDropdownModule,
    CollapseModule,
    AccordionModule,
    ProgressbarModule
} from 'ngx-bootstrap';
import { ValidationComponent } from 'app/shared/validation/validation.component';
import { SecurityService } from './shared/services/security.service';
import { TransactionService } from 'app/journal/idea/transaction.service';
import { ToolbarComponent } from 'app/shared/toolbar/toolbar.component';
import { ChartService } from 'app/dashboard/chart.service';
import { PortfolioService } from 'app/dashboard/portfolio.service';
import { VolumeService } from "./volume/volume.service";
import { CompareService } from "./shared/services/compare.service";
import {BrokerService} from "./shared/services/broker.service";
import {ConfigurationService} from "./shared/services/configuration.service";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        UserComponent,
        JournalComponent,
        TypographyComponent,
        VolumeComponent,
        NotificationsComponent,
        IdeaComponent,
        ValidationComponent,
        ToolbarComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes),
        SidebarModule,
        FooterModule,
        FixedPluginModule,
        FormsModule,
        ReactiveFormsModule,
        TypeaheadModule.forRoot(),
        PaginationModule.forRoot(),
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot(),
        BsDropdownModule.forRoot(),
        CollapseModule.forRoot(),
        AccordionModule.forRoot(),
        ProgressbarModule.forRoot()
    ],
    exports: [
    ],
    providers: [
        SecurityService, 
        TransactionService,
        ChartService,
        PortfolioService,
        VolumeService,
        CompareService,
        BrokerService,
        ConfigurationService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
