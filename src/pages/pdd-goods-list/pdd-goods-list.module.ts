import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PddGoodsListPage } from './pdd-goods-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PddGoodsListPage,
  ],
  imports: [
    IonicPageModule.forChild(PddGoodsListPage),
    ComponentsModule
  ],
})
export class PddGoodsListPageModule {}
