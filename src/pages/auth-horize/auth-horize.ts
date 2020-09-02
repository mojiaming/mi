import { AlertServiceProvider } from './../../providers/alert-service/alert-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { GlobalDataProvider } from '../../providers/global-data/global-data';

/**
 * Generated class for the AuthHorizePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auth-horize',
  templateUrl: 'auth-horize.html',
})
export class AuthHorizePage {
  data: any = {
    password: "0覆置本段内容￥OiRrcWN6J￥转移至ta0寶或掂击炼接 https://m.tb.cn/h.VDQ 至浏.览览.器【点击“打开”查看并浏览页面详情，精选商品任您选购】"
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private popoverCtrl: PopoverController,
    private globalData: GlobalDataProvider,
    private httpService: HttpServiceProvider,
    private storageService: StorageServiceProvider,
    private alertService:AlertServiceProvider) {
  }

  ionViewDidLoad() {
 
  }



  /**
   * 网页授权事件
   */
  onWeb() {
    let modal = this.popoverCtrl.create('BuyGoodsPage', { value: this.data.url, title: '网页授权',msg: "网页链接：" }, { cssClass: 'share-goods' });
    modal.present();
  }

  /**
   * 口令授权事件
   */
  onCode() {
    let modal = this.popoverCtrl.create('BuyGoodsPage', { value: this.data.password, title: '口令授权' }, { cssClass: 'share-goods' });
    modal.present();
  }

  /**
   * 点击成功验证事件
   */
  onSuccess() {
    this.navCtrl.goToRoot({});
  }
}
