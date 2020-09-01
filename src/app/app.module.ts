import { Validators } from './../providers/validators/Validators';
import { SearchPage } from './../pages/search/search';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { Transfer } from '@ionic-native/transfer';
import { FileUploadModule } from 'ng2-file-upload';
import { File } from '@ionic-native/file';
import { Clipboard } from '@ionic-native/clipboard';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { AppVersion } from '@ionic-native/app-version';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Wechat } from '@ionic-native/wechat';
import { CodePush } from "@ionic-native/code-push";
import { AppAvailability } from '@ionic-native/app-availability';

import { ConfigProvider } from '../providers/config/config';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { ToastServiceProvider } from '../providers/toast-service/toast-service';
import { LoadingServiceProvider } from '../providers/loading-service/loading-service';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { GlobalDataProvider } from '../providers/global-data/global-data';
import { AlertServiceProvider } from '../providers/alert-service/alert-service';
import { HelperProvider } from '../providers/helper/helper';
import { CameraServiceProvider } from '../providers/camera-service/camera-service';
import { ThemeableServiceProvider } from '../providers/themeable-service/themeable-service';
import { TaobaoServiceProvider } from '../providers/taobao-service/taobao-service';
import { ComponentsModule } from '../components/components.module';


export class MyErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    // do something with the error
    console.log(err);
    
    // alert(err)
  }
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ClipboardModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp, {
      swipeBackEnabled: true,
      backButtonText: '  ',
      // backButtonIcon:'ios-arrow-back',
      // iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition',
      mode: 'ios',//整体样式显示风格
      tabsHideOnSubPages: true//隐藏二级tab
    }),
    IonicStorageModule.forRoot({
      name: 'mitaodb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    FileUploadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Transfer,
    File,
    Clipboard,
    ThemeableBrowser,
    AppVersion,
    SocialSharing,
    Wechat,
    CodePush,
    AppAvailability,
    { provide: ErrorHandler, useClass: MyErrorHandler },
    ConfigProvider,
    HttpServiceProvider,
    ToastServiceProvider,
    LoadingServiceProvider,
    StorageServiceProvider,
    GlobalDataProvider,
    AlertServiceProvider,
    HelperProvider,
    CameraServiceProvider,
    ThemeableServiceProvider,
    Validators,
    TaobaoServiceProvider
  ]
})
export class AppModule { }
