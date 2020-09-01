import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  state: string = "one";
  data1 = [];
  param1 = { token: '', pageNo: 0, pageSize: 20 , tk_status: 12};
  ban1: boolean = false;

  data2 = [];
  param2 = { token: '', pageNo: 0, pageSize: 20 , tk_status: 14};
  ban2: boolean = false;

  data3 = [];
  param3 = { token: '', pageNo: 0, pageSize: 20 , tk_status: 3};
  ban3: boolean = false;

  data4 = [];
  param4 = { token: '', pageNo: 0, pageSize: 20 , tk_status: 13};
  ban4: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public globalData: GlobalDataProvider,
    private httpService: HttpServiceProvider,
    private loadingService: LoadingServiceProvider) {
  }

  ionViewDidLoad() {
    //  alert(this.globalData.token)
    this.param1.token = this.globalData.token;
    this.param2.token = this.globalData.token;
    this.param3.token = this.globalData.token;
    this.param4.token = this.globalData.token;
    this.loadingService.showLoading();
    this.getData1();
    this.getData2();
    this.getData3();
    this.getData4();
    if (this.navParams.get("value")) {
      this.state = this.navParams.get("value");
    }
  }

  getData1(infiniteScroll?:any){
    this.httpService.post('/order/select', this.param1).then(res => {
      this.loadingService.hideLoading();
      if(infiniteScroll){
        infiniteScroll.complete();
      }
      if(res && res['data']){
        if(res['data'].length < this.param1.pageSize){
          this.ban1 = true;
        }
        this.data1 = this.data1.concat(res['data']);
      }
    })
  }


  getData2(infiniteScroll?:any){
    this.httpService.post('/order/select', this.param2).then(res => {
      if(infiniteScroll){
        infiniteScroll.complete();
      }
      if(res && res['data']){
        if(res['data'].length < this.param2.pageSize){
          this.ban2 = true;
        }
        this.data2 = this.data2.concat(res['data']);
      }
    })
  }

  getData3(infiniteScroll?:any){
    this.httpService.post('/order/select', this.param3).then(res => {
      if(infiniteScroll){
        infiniteScroll.complete();
      }
      if(res && res['data']){
        if(res['data'].length < this.param3.pageSize){
          this.ban3 = true;
        }
        this.data3 = this.data3.concat(res['data']);
      }
    })
  }

  getData4(infiniteScroll?:any){
    this.httpService.post('/order/select', this.param4).then(res => {
      if(infiniteScroll){
        infiniteScroll.complete();
      }
      if(res && res['data']){
        if(res['data'].length < this.param4.pageSize){
          this.ban4 = true;
        }
        this.data4 = this.data4.concat(res['data']);
      }
    })
  }


  /**
   * 
   * @param refresher 下拉刷新
   */
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }



  /**
   * 
   * @param infiniteScroll 上拉加载
   */
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    if(this.state == 'one'){
      if(!this.ban1){
        this.param1.pageNo += this.param1.pageSize;
        this.getData1(infiniteScroll);
      } else {
        infiniteScroll.complete();
      }
    } else if(this.state == 'tow'){
      if(!this.ban2){
        this.param2.pageNo += this.param2.pageSize;
        this.getData2(infiniteScroll);
      } else {
        infiniteScroll.complete();
      }
    } else if(this.state == 'three'){
      if(!this.ban3){
        this.param3.pageNo += this.param3.pageSize;
        this.getData3(infiniteScroll);
      } else {
        infiniteScroll.complete();
      }
    } else if(this.state == 'four'){
      if(!this.ban4){
        this.param4.pageNo += this.param4.pageSize;
        this.getData4(infiniteScroll);
      } else {
        infiniteScroll.complete();
      }
    }
  }


}
