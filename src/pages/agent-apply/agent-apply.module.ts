import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgentApplyPage } from './agent-apply';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AgentApplyPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AgentApplyPage),
  ],
})
export class AgentApplyPageModule {}
