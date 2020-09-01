import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindOrderPage } from './find-order';

@NgModule({
  declarations: [
    FindOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(FindOrderPage),
  ],
})
export class FindOrderPageModule {}
