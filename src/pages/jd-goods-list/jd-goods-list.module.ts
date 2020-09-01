import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JdGoodsListPage } from './jd-goods-list';

@NgModule({
  declarations: [
    JdGoodsListPage,
  ],
  imports: [
    IonicPageModule.forChild(JdGoodsListPage),
    ComponentsModule
  ],
})
export class JdGoodsListPageModule {}
