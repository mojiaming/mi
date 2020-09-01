import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthHorizePage } from './auth-horize';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AuthHorizePage,
  ],
  imports: [
    IonicPageModule.forChild(AuthHorizePage),
    ComponentsModule
  ],
})
export class AuthHorizePageModule {}
