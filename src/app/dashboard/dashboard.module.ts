import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { InfoComponent } from './info/info.component';

@NgModule({
    declarations: [DashboardComponent, InfoComponent],
    imports: [CommonModule, SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
