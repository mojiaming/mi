import { ToastServiceProvider } from './../../providers/toast-service/toast-service';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the AssociatedAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-associated-account',
  templateUrl: 'associated-account.html',
})
export class AssociatedAccountPage {

  code: string = '';//关联码
  user:any = null;//用户信息

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private loadingService: LoadingServiceProvider,
    private toastService: ToastServiceProvider,
    private storageService: StorageServiceProvider,
    private globalData: GlobalDataProvider) {
  }

  ionViewDidLoad() {
    
  }


  /**
   * 验证事件
   */
  onAuth(){
    this.loadingService.showLoading();
    this.httpService.post('/user/select',{openid:this.code}).then((res:any) => {
      this.loadingService.hideLoading();
      if(res && res.msg == 'OK'){
        this.user = res.data;
      } else if(res.msg){
        this.toastService.showToast(res.msg);
      }
    })
  }

  /**
   * 关联事件
   */
  onAssociated(){
    this.loadingService.showLoading('登录中...');
    this.httpService.post('/user/loginId',{openid:this.code}).then((res:any) => {
      this.loadingService.hideLoading();
      if(res && res.msg == 'OK'){
        this.storageService.write('login:type', 'id');
        this.storageService.write('UserInfo', res.data);
        this.globalData.token = res.data.token;
        this.storageService.write('token', this.globalData.token);
        this.navCtrl.setRoot(TabsPage, { value: 0 });
      } else if(res.msg){
        this.toastService.showToast(res.msg);
      }
    })
  }

  onChange(){
    if(!this.code){
      this.user = null;
    }
  }
}
