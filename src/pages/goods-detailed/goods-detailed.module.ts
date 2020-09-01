import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsDetailedPage } from './goods-detailed';
import { ClipboardModule } from 'ngx-clipboard';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    GoodsDetailedPage,
  ],
  imports: [
    ClipboardModule,
    IonicPageModule.forChild(GoodsDetailedPage),
    ComponentsModule
  ],
})
export class GoodsDetailedPageModule { }
