import { GlobalDataProvider } from './../../providers/global-data/global-data';
import { ToastServiceProvider } from './../../providers/toast-service/toast-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the InviteCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invite-code',
  templateUrl: 'invite-code.html',
})
export class InviteCodePage {
  user:any;
  code: string = '';
  isInvite:boolean = true;//是否可以提交
  inviteUser: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private toastService: ToastServiceProvider,
    private loadingService: LoadingServiceProvider,
    private storageService: StorageServiceProvider,
    private globalData: GlobalDataProvider) {
  }

  ionViewDidLoad() {
    this.user = this.navParams.get('value');

  }

  /**
   * 验证码监听事件
   */
  onCodeChange(){
   
  }

  /**
   * 提交
   */
  onSubmit(){
    this.toastService.showToast('注册成功');
  }

}
