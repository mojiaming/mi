import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PddGoodsDetailedPage } from './pdd-goods-detailed';

@NgModule({
  declarations: [
    PddGoodsDetailedPage,
  ],
  imports: [
    IonicPageModule.forChild(PddGoodsDetailedPage),
    ComponentsModule
  ],
})
export class PddGoodsDetailedPageModule {}
