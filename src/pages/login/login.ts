import { HelperProvider } from './../../providers/helper/helper';
import { ToastServiceProvider } from './../../providers/toast-service/toast-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
declare var Wechat: any;
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isMobile:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingService: LoadingServiceProvider,
    private httpService: HttpServiceProvider,
    private globalData: GlobalDataProvider,
    private storageService: StorageServiceProvider,
    private toastService: ToastServiceProvider,
    private helper: HelperProvider) {
  }

  ionViewDidLoad() {
    this.isMobile = this.helper.isMobile();
  }

  /**
   * 关闭事件
   */
  onClose() {
    this.navCtrl.setRoot(TabsPage, { value: 0 });
  }

  onEmail() {
    this.navCtrl.push('RegisterEmailPage',{inviteCode:''});
  }

  /**
   * 微信登录事件
   */
  onWeChat() {
    Wechat.auth("snsapi_userinfo", "_" + (+new Date()), (response) => {
      this.loadingService.showLoading();
      this.httpService.post('/user/wechatCode',{code :response.code}).then((user:any) => {
        if (user && user.msg == 'OK') {
          this.httpService.post('/user/loginWechat', {openid:user.data.openid}).then((data: any) => {
            this.loadingService.hideLoading();
            if (data && data.msg == 'OK') {
              // 用户已存在
              this.globalData.token = data.data.token;
              data.data.openid = user.data.openid;
              this.storageService.write('login:type', 'wechat');
              this.storageService.write('token', this.globalData.token);
              this.storageService.write("UserInfo", data.data);
              this.navCtrl.setRoot(TabsPage, { value: 0 });
            } else {
 
              // 用户不存在
              this.navCtrl.push('InviteCodePage', { value: user.data });
            }
          })
        }
      })

    }, (error) => {
     this.toastService.showToast('微信授权失败');
    })

  }

  /**
   * 关联公众号事件
   */
  onPublic() {
    this.navCtrl.push('AssociatedAccountPage');
  }

}
