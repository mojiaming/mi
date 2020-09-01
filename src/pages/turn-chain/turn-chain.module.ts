import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TurnChainPage } from './turn-chain';

@NgModule({
  declarations: [
    TurnChainPage,
  ],
  imports: [
    IonicPageModule.forChild(TurnChainPage),
  ],
})
export class TurnChainPageModule {}
