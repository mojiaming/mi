import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssociatedAccountPage } from './associated-account';

@NgModule({
  declarations: [
    AssociatedAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(AssociatedAccountPage),
  ],
})
export class AssociatedAccountPageModule {}
