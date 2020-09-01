import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GlobalDataProvider } from '../../providers/global-data/global-data';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';

/**
 * Generated class for the MyTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-team',
  templateUrl: 'my-team.html',
})
export class MyTeamPage {
  state: string = "one";
  total: number;

  data1 = [];
  total1: number;
  param1 = { token: '', pageNo: 0, pageSize: 10 };
  ban1: boolean = false;

  total2: number;
  data2 = [];
  param2 = { token: '', pageNo: 0, pageSize: 10 };
  ban2: boolean = false;

  userInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public globalData: GlobalDataProvider,
    private httpService: HttpServiceProvider,
    private storageServicer: StorageServiceProvider,
    private loadingService: LoadingServiceProvider) {
  }

  ionViewDidLoad() {
    this.param1.token = this.globalData.token;
    this.param2.token = this.globalData.token;
    this.loadingService.showLoading();
    this.getData1();
    this.getData2();

    this.userInfo = this.storageServicer.read("UserInfo");

    if (this.userInfo && this.userInfo.type == 2) {
      this.httpService.post('/relevance/selectTotal', { token: this.globalData.token }).then(res => {
        if (res && res['total']) {
          this.total = res['total'];
        }
      })
    }

  }

  getData1(infiniteScroll?: any) {
    this.httpService.post('/relevance/selectAll', this.param1).then(res => {
      this.loadingService.hideLoading();
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
      if (res && res['data']) {
        this.total1 = res['total'];
        if (res['data'].length < this.param1.pageSize) {
          this.ban1 = true;
        }
        this.data1 = this.data1.concat(res['data']);
      }
    })
  }


  getData2(infiniteScroll?: any) {
    this.httpService.post('/relevance/selectAllTow', this.param2).then(res => {
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
      if (res && res['data']) {
        this.total2 = res['total'];
        if (res['data'].length < this.param2.pageSize) {
          this.ban2 = true;
        }
        this.data2 = this.data2.concat(res['data']);
      }
    })
  }




  /**
   * 
   * @param infiniteScroll 上拉加载
   */
  doInfinite(infiniteScroll) {

    if (this.state == 'one') {
      if (!this.ban1) {
        this.param1.pageNo += this.param1.pageSize ;
        this.getData1(infiniteScroll);
      } else {
        infiniteScroll.complete();
      }
    } else if (this.state == 'tow') {
      if (!this.ban2) {
        this.param2.pageNo += this.param2.pageSize;
        this.getData2(infiniteScroll);
      } else {
        infiniteScroll.complete();
      }
    }
  }

}
