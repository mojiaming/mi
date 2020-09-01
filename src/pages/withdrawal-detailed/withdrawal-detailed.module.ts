import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WithdrawalDetailedPage } from './withdrawal-detailed';

@NgModule({
  declarations: [
    WithdrawalDetailedPage,
  ],
  imports: [
    IonicPageModule.forChild(WithdrawalDetailedPage),
    ComponentsModule
  ],
})
export class WithdrawalDetailedPageModule {}
