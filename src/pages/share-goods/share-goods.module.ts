import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareGoodsPage } from './share-goods';

@NgModule({
  declarations: [
    ShareGoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShareGoodsPage),
  ],
})
export class ShareGoodsPageModule {}
