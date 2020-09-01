import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TbAuthorizaPage } from './tb-authoriza';

@NgModule({
  declarations: [
    TbAuthorizaPage,
  ],
  imports: [
    IonicPageModule.forChild(TbAuthorizaPage),
  ],
})
export class TbAuthorizaPageModule {}
