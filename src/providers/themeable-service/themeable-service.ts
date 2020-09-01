import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { Injectable } from '@angular/core';

/*
  Generated class for the ThemeableServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ThemeableServiceProvider {
  options: ThemeableBrowserOptions = {
    statusbar: {
      color: '#ffffff'
    },
    toolbar: {
      height: 44,
      color: '#ffffff'
    },
    title: {
      color: '#000',
      showPageTitle: true,
      staticText: '蜜淘平台'
    },
    closeButton: {
      image: 'close',
      imagePressed: 'close_pressed',
      align: 'left',
      event: 'closePressed'
    },
    backButtonCanClose: true
  };
  browser: ThemeableBrowserObject = null;

  constructor(private themeableBrowser: ThemeableBrowser) {

  }

  /**
   * 创建页面
   * @param url 
   * @param callBack 关闭回调
   */
  create(url:string,target = '_blank',callBack?){
    this.browser = this.themeableBrowser.create(url, target, this.options);
    this.browser.on('closePressed').subscribe(event => {
      if(callBack){
        callBack(event);
      }
    });
  }

}
