import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';

/**
 * Generated class for the IncomeDetailedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-income-detailed',
  templateUrl: 'income-detailed.html',
})
export class IncomeDetailedPage {

  state: string = "one";

  data1 = [];
  param1 = { token: '', pageNo: 0, pageSize: 10, type: 0 };
  ban1: boolean = false;

  data2 = [];
  param2 = { token: '', pageNo: 0, pageSize: 10, type: 1 };
  ban2: boolean = false;

  data3 = [];
  param3 = { token: '', pageNo: 0, pageSize: 10, type: 2 };
  ban3: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public globalData: GlobalDataProvider,
    private httpService: HttpServiceProvider,
    private loadingService: LoadingServiceProvider) {
  }

  ionViewDidLoad() {
    this.param1.token = this.globalData.token;
    this.param2.token = this.globalData.token;
    this.param3.token = this.globalData.token;
    // this.loadingService.showLoading();
    this.getData1();
    this.getData2();
    this.getData3();
  }

  getData1(infiniteScroll?: any) {

  }


  getData2(infiniteScroll?: any) {

  }

  getData3(infiniteScroll?: any) {

  }




  /**
   * 
   * @param infiniteScroll 上拉加载
   */
  doInfinite(infiniteScroll) {

    if (this.state == 'one') {
      if (!this.ban1) {
        this.param1.pageNo += this.param1.pageSize;
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
    } else if (this.state == 'three') {
      if (!this.ban3) {
        this.param3.pageNo += this.param3.pageSize;
        this.getData3(infiniteScroll);
      } else {
        infiniteScroll.complete();
      }
    }
  }

}
