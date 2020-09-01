import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { ClipboardService } from 'ngx-clipboard';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';

/**
 * Generated class for the BuyGoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-goods',
  templateUrl: 'buy-goods.html',
})
export class BuyGoodsPage {

  text:string = '';
  msg:string = '';
  title:string = '';
  constructor(public viewCtrl: ViewController,
    private navParam: NavParams,
    private toastService: ToastServiceProvider,
    private clipboardServeice: ClipboardService) {
  }

  ionViewDidLoad() {
    this.title  = this.navParam.get('title');
    this.text = this.navParam.get('value');
    this.msg = this.navParam.get('msg');
    if(!this.msg){
      this.msg = '淘口令：';
    }
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
      if(this.navParam.get('msg')){
        this.toastService.showToast('复制成功，打开浏览器粘贴Url打开即可!');
      } else {
        this.toastService.showToast('复制成功，打开手机淘宝即可!');
      }

      this.onClose();
    } else {
      this.toastService.showToast('复制失败，请手动复制!');
    }
    
  }

}
