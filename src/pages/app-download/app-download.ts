import { ConfigProvider } from './../../providers/config/config';
import { HelperProvider } from './../../providers/helper/helper';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AppDownloadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-download',
  templateUrl: 'app-download.html',
})
export class AppDownloadPage {
  isWXBrowser:boolean = false;
  isShow:boolean = false;
  androidUrl: string = ConfigProvider.APP_API + '/apk/mitaoAndroid.apk';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private helper: HelperProvider) {
  }

  ionViewDidLoad() {

    this.isWXBrowser = this.helper.isWXBrowser();
  }

  /**
   * ios 按钮点击事件
   */
  onIos(){
    if(this.isWXBrowser){
      this.isShow = !this.isShow;
    } else {
      window.open('https://xxx.com','_blank')
    }
  }

  /**
   * 文字点击事件
   */
  onShow(){
    this.isShow = !this.isShow;
  }

}
