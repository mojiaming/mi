import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecialGoodsPage } from './special-goods';

@NgModule({
  declarations: [
    SpecialGoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(SpecialGoodsPage),
  ],
})
export class SpecialGoodsPageModule {}
