import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { ClipboardService } from 'ngx-clipboard';

/**
 * Generated class for the ShareGoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share-goods',
  templateUrl: 'share-goods.html',
})
export class ShareGoodsPage {

  goods: any;
  text: string = '';


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    private toastService: ToastServiceProvider,
    private clipboardServeice: ClipboardService) {
  }

  ionViewDidLoad() {
    this.goods = this.navParams.get('value');
    this.text = this.goods.title + '【原价】' + this.goods.reserve_price + '【折后】' + this.goods.zk_final_price + '【复制此信息打开手机淘宝即可查看并下单】' + this.goods.tbk_pwd +( this.goods.coupon_info?'【优惠卷】' + this.goods.coupon_info:'')
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

  /**
   * 复制成功回调
   */
  successFun() {
    let iscopy = this.clipboardServeice.copyFromContent(this.text);
    if(iscopy){
      this.toastService.showToast('复制成功!');
      this.onClose();
    } else {
      this.toastService.showToast('复制失败，请手动复制!');
    }
    
  }

}
