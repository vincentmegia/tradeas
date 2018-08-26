import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VolumeComponent } from './volume.component';
import { VolumeRoutes } from './volume.routing';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbDateParserFormatter, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoadingBarModule } from "@ngx-loading-bar/core";
import { NgbDateLongParserFormatter } from "../shared/formatters/NgbDateLongParserFormatter";
import { DataTablesModule } from "angular-datatables";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(VolumeRoutes),
        FormsModule,
        NgbModule,
        LoadingBarModule,
        DataTablesModule,
        JwBootstrapSwitchNg2Module
    ],
    declarations: [VolumeComponent],
    providers: [
        { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
        { provide: NgbDateParserFormatter, useClass: NgbDateLongParserFormatter }
        ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class VolumeModule {}
