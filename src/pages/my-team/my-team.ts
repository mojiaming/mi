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
 

  }




  /**
   * 
   * @param infiniteScroll 上拉加载
   */
  doInfinite(infiniteScroll) {

  }

}
