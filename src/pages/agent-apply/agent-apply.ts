import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';

/**
 * Generated class for the AgentApplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agent-apply',
  templateUrl: 'agent-apply.html',
})
export class AgentApplyPage {
  userInfo: any;
  amount: number = 0;
  isSubmit: boolean = true;//是否禁用提交
  total: number = 0;
  param = {
    wechat: '',
    phome: '',
    token: '',
    state: 0
  }
  disable = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public globalData: GlobalDataProvider,
    private httpService: HttpServiceProvider,
    private toastService: ToastServiceProvider,
    private storageServicer: StorageServiceProvider,
    private loadingService: LoadingServiceProvider) {
  }

  ionViewDidLoad() {
    this.param.token = this.globalData.token;
    this.userInfo = this.storageServicer.read("UserInfo");
    if (this.userInfo.type == 2) {
      this.toastService.showToast('您已经是尊贵的代理人');
      this.disable = true;
    } else {
      this.loadingService.showLoading();
      this.httpService.post('/agent/select', this.param).then(res => {
        this.loadingService.hideLoading();
        if (res && res['data']) {
          this.disable = true;
          this.toastService.showToast('你已经申请过！');
        }
      })
    }



    this.getData1();
    this.getData2();
    this.getData3();


  }


  getData1(infiniteScroll?: any) {
    this.httpService.post('/relevance/selectAll', { token: this.param.token, pageNo: 0, pageSize: 0 }).then(res => {
      if (res && res['data']) {
        this.amount += Number(res['total']);
      }
    })
  }


  getData2(infiniteScroll?: any) {
    this.httpService.post('/relevance/selectAllTow', { token: this.param.token, pageNo: 0, pageSize: 0 }).then(res => {

      if (res && res['data']) {
        this.amount += Number(res['total']);
      }
    })
  }

  getData3(){
    this.httpService.get('/system/select').then(res => {
      if (res && res['data']) {
        this.total += Number(res['data'].applications);
      }
      this.isSubmit = false;
    })
  }

  onSubmit() {
    this.httpService.post('/agent/insert', this.param).then(res => {
      if (res && res['data']) {
        this.toastService.showToast('已提交申请，请等候审核。');
        this.disable = true;
      }
    })
  }

}
