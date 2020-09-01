import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MakeMoneyPage } from './make-money';

@NgModule({
  declarations: [
    MakeMoneyPage,
  ],
  imports: [
    IonicPageModule.forChild(MakeMoneyPage),
  ],
})
export class MakeMoneyPageModule {}
