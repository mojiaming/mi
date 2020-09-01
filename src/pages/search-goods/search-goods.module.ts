import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchGoodsPage } from './search-goods';

@NgModule({
  declarations: [
    SearchGoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchGoodsPage),
  ],
})
export class SearchGoodsPageModule {}
