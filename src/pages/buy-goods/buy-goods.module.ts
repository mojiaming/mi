import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyGoodsPage } from './buy-goods';

@NgModule({
  declarations: [
    BuyGoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyGoodsPage),
  ],
})
export class BuyGoodsPageModule {}
