import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { AlertServiceProvider } from './../../providers/alert-service/alert-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

/**
 * Generated class for the FindOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-order',
  templateUrl: 'find-order.html',
})
export class FindOrderPage {
  trade_id: string = null;//订单号
  userInfo: any;
  showAuthorize: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingService: LoadingServiceProvider,
    private httpService: HttpServiceProvider,
    private alertService: AlertServiceProvider,
    private storageService: StorageServiceProvider) {
  }

  ionViewDidLoad() {
    this.userInfo = this.storageService.read("UserInfo");
    // 检查是否以渠道授权
    if (this.userInfo && !this.userInfo.relation_id) {
      this.showAuthorize = true;
    }
  }

  /**
   * 找回订单
   */
  onFindOrder(){
    // this.loadingService.showLoading();
    // this.httpService.post('/findOrder',{trade_id:this.trade_id}).then((res:any) => {
    //   this.loadingService.hideLoading();
    //   if(res && res.msg == 'OK'){
    //     this.navCtrl.push('OrderPage');
    //   } else if(res && res.msg) {
    //     this.alertService.showAlert(res.msg);
    //   }
    // })
    this.navCtrl.push('OrderPage');
  }

  /**
   * 授权事件
   */
  onToAuth(){
    this.navCtrl.push('AuthHorizePage');
  }

}
