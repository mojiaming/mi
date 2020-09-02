import { HelperProvider } from './../../providers/helper/helper';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { ThemeableServiceProvider } from '../../providers/themeable-service/themeable-service';

/**
 * Generated class for the TurnChainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-turn-chain',
  templateUrl: 'turn-chain.html',
})
export class TurnChainPage {
  text: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService:HttpServiceProvider,
    private loadingService: LoadingServiceProvider,
    private helper: HelperProvider,
    private events: Events,
    private toastService: ToastServiceProvider,
    private themeableService: ThemeableServiceProvider) {
  }

  ionViewDidLoad() {
     
  }

  /**
   * 转换接口
   */
  onZhuanhuan(){
    if (this.helper.isLogin()) {
      this.loadingService.showLoading();
      this.httpService.post('/****goods', { para: this.text }).then((res: any) => {
        this.loadingService.hideLoading();
        if (res && res.type) {
          if (res.type == 'PDD') {
            this.navCtrl.push('PddGoodsDetailedPage', { value: res.data.goodsId });
          } else if (res.type == 'JD') {
            this.helper.openUrlByBrowser(res.data);         
          } else if (res.type == 'TB') {
            this.navCtrl.push('GoodsDetailedPage', { goods: res.data.num_iid });
          }
        } else {
          this.toastService.showToast(res.data);
        }
      })
    } else {
      this.events.publish('login:go');
    }
  }


  onJiaoCheng(){
    if(this.helper.isMobile()){
      this.themeableService.create('https://mp.weixin.qq.com/s/7Ep4fbrvRezy8irnrxQRzw');
    } else {
      this.helper.openUrlByBrowser('https://mp.weixin.qq.com/s/7Ep4fbrvRezy8irnrxQRzw');
    }
  }
}
