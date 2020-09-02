import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { ClipboardService } from 'ngx-clipboard';

/**
 * Generated class for the AssociatedCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-associated-code',
  templateUrl: 'associated-code.html',
})
export class AssociatedCodePage {
  code:string = '';
  isCreate:boolean = false;//生成按钮是否禁用
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService:HttpServiceProvider,
    private toastService: ToastServiceProvider,
    private clipboardServeice: ClipboardService) {
  }

  ionViewDidLoad() {

  }

  /**
   * 生成关联码
   */
  setCode(){
    this.code = "12345678910";
  }

  /**
   * 复制事件
   */
  onCopy(){
    let iscopy = this.clipboardServeice.copyFromContent(this.code);
    if(iscopy){
      this.toastService.showToast('复制成功!');
    } else {
      this.toastService.showToast('复制失败!');
    }
  }
}
