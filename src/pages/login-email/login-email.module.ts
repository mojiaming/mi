import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginEmailPage } from './login-email';

@NgModule({
  declarations: [
    LoginEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginEmailPage),
  ],
})
export class LoginEmailPageModule {}
