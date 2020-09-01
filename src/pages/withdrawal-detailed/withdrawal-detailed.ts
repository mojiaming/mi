import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
/**
 * Generated class for the WithdrawalDetailedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-withdrawal-detailed',
  templateUrl: 'withdrawal-detailed.html',
})
export class WithdrawalDetailedPage {

  param = {
    token: '',
    pageNo: 0,
    pageSize: 10
  }
  data = [];
  ban = false;
  constructor(private httpService: HttpServiceProvider,
    private globalData: GlobalDataProvider,
    private loadingService: LoadingServiceProvider) {
  }

  ionViewDidLoad() {
    this.param.token = this.globalData.token;
    this.loadingService.showLoading();
    this.getData();

  }

  getData(infiniteScroll?: any) {
    if (infiniteScroll) {
      infiniteScroll.complete();
    }
    this.httpService.post('/withdrawal/selectAll', this.param).then(res => {
      this.loadingService.hideLoading();
      if (res && res['data']) {
        if (res['data'].length < this.param.pageSize) {
          this.ban = true;
          if (infiniteScroll) {
            infiniteScroll.enable(false);
          }
        }
        this.data = this.data.concat(res['data']);
      }
    })
  }


  /**
  * 
  * @param infiniteScroll 上拉加载
  */
  doInfinite(infiniteScroll) {

    if (!this.ban) {
      this.param.pageNo += this.param.pageSize;
      this.getData(infiniteScroll);
    } else {
      infiniteScroll.complete();
    }
  }

}
