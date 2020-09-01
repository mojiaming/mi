import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
/**
 * Generated class for the WithdrawalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-withdrawal',
  templateUrl: 'withdrawal.html',
})
export class WithdrawalPage {
  userInfo: any;
  param = {
    money: '',
    total_money: '',
    state: 0,
    token: '',
    cash_account: ''
  }
  constructor(public navCtrl: NavController, public toastService: ToastServiceProvider,
    private storageService: StorageServiceProvider,
    private httpService: HttpServiceProvider,
    private globalData: GlobalDataProvider) {

  }

  ionViewDidLoad() {
    this.param.token = this.globalData.token;
    this.userInfo = this.storageService.read("UserInfo");
    this.param.total_money = this.userInfo.userInfo.balance;
    this.param.cash_account = this.userInfo.userInfo.cash_account;
  }

  onSubmit() {
    if (Number(this.param.money) % 5 == 0 && Number(this.param.money) <= Number(this.param.total_money) && Number(this.param.money) >= 10) {
      this.httpService.post('/withdrawal/insert', this.param).then(res => {
        console.log(res);
        if (res && res['data']) {
          this.userInfo.userInfo.balance = (this.userInfo.userInfo.balance - Number(this.param.money)).toFixed(2);
          this.param.total_money = this.userInfo.userInfo.balance;
          this.storageService.write('UserInfo', this.userInfo);
          this.toastService.showToast('申请提交成功，工作人员会在三个工作日内处理');
        } else {
          this.toastService.showToast(res['msg']);
        }

      })
    } else {
      this.toastService.showToast('请输入正确的金额');
    }
  }

}
