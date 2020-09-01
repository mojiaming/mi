import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PddGoodsPage } from './pdd-goods';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PddGoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(PddGoodsPage),
    ComponentsModule
  ],
})
export class PddGoodsPageModule {}
