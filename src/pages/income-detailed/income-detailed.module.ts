import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncomeDetailedPage } from './income-detailed';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    IncomeDetailedPage,
  ],
  imports: [
    IonicPageModule.forChild(IncomeDetailedPage),
    ComponentsModule
  ],
})
export class IncomeDetailedPageModule {}
