import { AlertServiceProvider } from './../alert-service/alert-service';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { GlobalDataProvider } from '../global-data/global-data';
import { ThemeableServiceProvider } from '../themeable-service/themeable-service';
import { ConfigProvider, CODE_PUSH_DEPLOYMENT_KEY, IS_DEBUG } from '../config/config';
import { CodePush } from "@ionic-native/code-push";

/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {

  constructor(private platform: Platform,
    private themeableService: ThemeableServiceProvider,
    private globalData: GlobalDataProvider,
    private alertService: AlertServiceProvider,
    private codePush: CodePush) {

  }


  /**
     * 是否真机环境
     * @return {boolean}
     */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   * @return {boolean}
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }


  /**
 * 是否ios真机环境
 * @return {boolean}
 */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  /**
   * 判断是否登录
   */
  isLogin() {
    return this.globalData.token ? true : false;
  }



  /**
   * 是否微信浏览器
   */
  isWXBrowser = (() => {
    let isWx = null;
    return () => {
      if (isWx === null) {
        isWx = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
      }
      return isWx;
    };
  })();

  /**
    * 通过浏览器打开url
    */
  openUrlByBrowser(url: string): void {
    if (this.isMobile()) {
      this.themeableService.create(url, '_system');
    } else {
      window.open(url, '_blank')
    }

  }

  /**
   * 下载安装app
   */
  downloadApp() {
    this.alertService.showConfirm('检测到有新版本', '是否马上下载更新，体验最新功能？', '稍后', '立即下载').then(() => {
      if (this.isIos()) {
        this.openUrlByBrowser('https://itunes.apple.com/cn');
      } else if (this.isAndroid()) {
        this.openUrlByBrowser(ConfigProvider.DOWNLOAD_URL + '/apk/mitaoAndroid.apk');
      }
    })
  }


  /*
   * 热更新同步方法
   */
  sync() {
    if (this.isMobile()) {
      let deploymentKey = '';
      if (this.isAndroid() && IS_DEBUG) {
        deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.android.Staging;
      }
      if (this.isAndroid() && !IS_DEBUG) {
        deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.android.Production;
      }
      if (this.isIos() && IS_DEBUG) {
        deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.ios.Staging;
      }
      if (this.isIos() && !IS_DEBUG) {
        deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.ios.Production;
      }
      this.codePush.sync({
        deploymentKey: deploymentKey
      }).subscribe(syncStatus => {
        console.log(syncStatus)
      });
    }
  }

  /**
   * 获取当前年月日时间
   * @param AddDayCount 多少天后时间
   */
  getDate(AddDayCount?: number) {
    let date = new Date();
    if (AddDayCount) {
      date.setDate(date.getDate() + AddDayCount);//获取AddDayCount天后的日期
    }
    let y = date.getFullYear();
    let m = date.getMonth() + 1;//获取当前月份的日期
    let d = date.getDate();
    let mm = m + '';
    let dd = d + '';
    if (m < 10) {
      mm = "0" + m;
    }
    if (d < 10) {
      dd = "0" + d;
    }
    return y + "-" + mm + "-" + dd;
  }

  /**
   * 获取倒计时
   * @param timestamp 
   */
  getCountDown(timestamp) {
    let nowTime = new Date();
    let endTime = new Date(timestamp);

    let t = endTime.getTime() - nowTime.getTime();
    //            var d=Math.floor(t/1000/60/60/24);
    let hour: any = Math.floor(t / 1000 / 60 / 60 % 24);
    let min: any = Math.floor(t / 1000 / 60 % 60);
    let sec: any = Math.floor(t / 1000 % 60);

    if (hour < 10) {
      hour = "0" + hour;
    }
    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }
    return hour + ":" + min + ":" + sec;
  }

}
