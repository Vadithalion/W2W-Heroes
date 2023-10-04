import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from "../pipes/pipes.module";

import { CardComponent } from './card/card.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



@NgModule({
    declarations: [
        CardComponent,
        ConfirmDialogComponent
    ],
    exports: [
        CardComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        PipesModule
    ]
})
export class ComponentsModule { }
