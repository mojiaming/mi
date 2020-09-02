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
  data = [];
  ban = false;
  constructor(private httpService: HttpServiceProvider,
    private globalData: GlobalDataProvider,
    private loadingService: LoadingServiceProvider) {
  }

  ionViewDidLoad() {
    this.loadingService.showLoading();
    this.getData();

  }

  getData(infiniteScroll?: any) {
    if (infiniteScroll) {
      infiniteScroll.complete();
    }
    this.httpService.get('/withdrawal.json').then(res => {
      this.loadingService.hideLoading();
      if (res && res['data']) {
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
      this.getData(infiniteScroll);
    } else {
      infiniteScroll.complete();
    }
  }

}
