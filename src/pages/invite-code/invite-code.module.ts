import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InviteCodePage } from './invite-code';

@NgModule({
  declarations: [
    InviteCodePage,
  ],
  imports: [
    IonicPageModule.forChild(InviteCodePage),
  ],
})
export class InviteCodePageModule {}
