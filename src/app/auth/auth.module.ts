import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { EmailComponent } from './email/email.component';
import { PasswordComponent } from './password/password.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [AuthComponent, EmailComponent, PasswordComponent],
    imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
