import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterEmailPage } from './register-email';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RegisterEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterEmailPage),
    ComponentsModule
  ],
})
export class RegisterEmailPageModule {}
