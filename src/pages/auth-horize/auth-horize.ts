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
  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private popoverCtrl: PopoverController,
    private globalData: GlobalDataProvider,
    private httpService: HttpServiceProvider,
    private storageService: StorageServiceProvider,
    private alertService:AlertServiceProvider) {
  }

  ionViewDidLoad() {
    this.httpService.get('/taobao/getAuthCode').then((res: any) => {
      this.data = res;
    })
  }



  /**
   * 网页授权事件
   */
  onWeb() {
    // let modal = this.modalCtrl.create('TbAuthorizaPage', { url: this.data.url });
    // modal.present();
    // modal.onDidDismiss(data => {
    //   if(data){
    //     this.onSuccess();
    //   }
    // })
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
    this.httpService.get('/taobao/successAuth?token='+this.globalData.token).then((res: any) => {
      if (res && res.data && res.data.relation_id) {
        this.storageService.write("UserInfo", res.data);
        this.navCtrl.goToRoot({});
      } else {
        this.alertService.showAlert( "账号暂未授权完成，请检测是否已确认授权。如有疑问请联系客服！");
      }
    })
  }
}
