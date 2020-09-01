import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SnapUpGoodsPage } from './snap-up-goods';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SnapUpGoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(SnapUpGoodsPage),
    ComponentsModule
  ],
})
export class SnapUpGoodsPageModule {}
