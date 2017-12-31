import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ ToolbarComponent ],
    exports: [ ToolbarComponent ]
})

export class ToolbarModule {}
