import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotGoodsPage } from './hot-goods';

@NgModule({
  declarations: [
    HotGoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(HotGoodsPage),
  ],
})
export class HotGoodsPageModule {}
