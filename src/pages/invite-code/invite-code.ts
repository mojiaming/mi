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
    this.isInvite = true;
    if(this.code.length == 6){
      this.httpService.post('/user/selectCode',{code: this.code}).then((res:any) => {
        if(res && res.msg == 'OK' && res.data ){
          this.isInvite = false;
          this.inviteUser = res.data;
        } else {
          this.toastService.showToast('邀请码错误，未找到关联用户');
        }
      })
    }
  }

  /**
   * 提交
   */
  onSubmit(){
    this.loadingService.showLoading();
    this.user.code = this.code;
    this.httpService.post('/user/weChatLogin',this.user).then((res:any) => {
      this.loadingService.hideLoading();
      if(res && res.msg == 'OK'){
        this.toastService.showToast('注册成功');
        res.data.openid = this.user.openid;
        this.storageService.write('UserInfo', res.data);
        this.storageService.write('login:type', 'wechat');
        this.globalData.username = res.data.nickname;
        this.globalData.token = res.data.token;
        this.storageService.write('token', this.globalData.token);
        this.navCtrl.setRoot(TabsPage, { value: 0 });
      } else if(res.msg) {
        this.toastService.showToast(res.msg);
      }
    })
  }

}
