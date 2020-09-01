import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenUrlPage } from './open-url';

@NgModule({
  declarations: [
    OpenUrlPage,
  ],
  imports: [
    IonicPageModule.forChild(OpenUrlPage),
  ],
})
export class OpenUrlPageModule {}
