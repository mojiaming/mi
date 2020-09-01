import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyTeamPage } from './my-team';

@NgModule({
  declarations: [
    MyTeamPage,
  ],
  imports: [
    IonicPageModule.forChild(MyTeamPage),
    ComponentsModule
  ],
})
export class MyTeamPageModule {}
