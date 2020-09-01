import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppDownloadPage } from './app-download';

@NgModule({
  declarations: [
    AppDownloadPage,
  ],
  imports: [
    IonicPageModule.forChild(AppDownloadPage),
    ComponentsModule
  ],
})
export class AppDownloadPageModule {}
