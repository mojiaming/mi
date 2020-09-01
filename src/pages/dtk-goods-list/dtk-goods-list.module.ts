import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DtkGoodsListPage } from './dtk-goods-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DtkGoodsListPage,
  ],
  imports: [
    IonicPageModule.forChild(DtkGoodsListPage),
    ComponentsModule
  ],
})
export class DtkGoodsListPageModule {}
