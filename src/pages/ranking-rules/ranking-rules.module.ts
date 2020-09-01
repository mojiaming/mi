import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RankingRulesPage } from './ranking-rules';

@NgModule({
  declarations: [
    RankingRulesPage,
  ],
  imports: [
    IonicPageModule.forChild(RankingRulesPage),
  ],
})
export class RankingRulesPageModule {}
