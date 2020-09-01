import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JdGoodsPage } from './jd-goods';

@NgModule({
  declarations: [
    JdGoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(JdGoodsPage),
    ComponentsModule
  ],
})
export class JdGoodsPageModule {}
