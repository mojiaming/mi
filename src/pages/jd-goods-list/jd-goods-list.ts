import { HelperProvider } from './../../providers/helper/helper';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';

/**
 * Generated class for the JdGoodsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'JdGoodsListPage',
  segment: 'jd-goods-list/:value'
})
@Component({
  selector: 'page-jd-goods-list',
  templateUrl: 'jd-goods-list.html',
})
export class JdGoodsListPage {
  searchtext: string = '';
  priceIcon: string = 'arrow-round-down';
  salesIcon: string = 'arrow-round-down';
  commissionIcon: string = 'arrow-round-down';
  selectFlag: number = 0; //如果没有点击排序，默认为无
  page: number = 1;
  pageSize: number = 20;
  data = [];
  role: number = 0.3;//分成
  postParam = {
    keyword: '',
    pageIndex: 1,
    pageSize: 20
    // sort: 'inOrderCount30Days',
    // sortName: 'desc'
  }
  ban = false;
  item: any = null;//主题商品
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private loadingService: LoadingServiceProvider,
    private storageService: StorageServiceProvider,
    private helper: HelperProvider) {
  }

  ionViewDidLoad() {
    this.searchtext = this.navParams.get('value') ? decodeURI(this.navParams.get('value')) : '';
    this.loadingService.showLoading();
    this.role = this.storageService.read('roleNumber');
    this.getData();

  }



  /**
   *获取数据，传入排序
   * @param sort 
   */
  getData(infiniteScroll?: any) {

  }

  /**
  * 搜索事件
  */
  onSearch() {
    this.data = [];
    this.page = 1;
    this.getData();
  }


  /**
    * 上拉加载
    * @param infiniteScroll 
    */
  doInfinite(infiniteScroll) {
    this.page += 1;
    this.getData(infiniteScroll);
  }


  /**
   * 排序切换
   * @param num 
   */
  // filter(num: number) {
  //   // 价格升降
  //   if (num == this.selectFlag && num == 4) {
  //     this.priceIcon = this.priceIcon == 'arrow-round-down' ? 'arrow-round-up' : 'arrow-round-down';
  //     this.data = [];
  //     this.page = 1;
  //     this.postParam.sortName = 'pcPrice';
  //     if (this.priceIcon == 'arrow-round-down') {
  //       this.postParam.sort = 'desc';
  //     } else {
  //       this.postParam.sort = 'asc';
  //     }
  //     this.getData();
  //   } else if (num == this.selectFlag && num == 0) {
  //     // 销量升降
  //     this.salesIcon = this.salesIcon == 'arrow-round-down' ? 'arrow-round-up' : 'arrow-round-down';
  //     this.data = [];
  //     this.page = 1;
  //     this.postParam.sortName = 'inOrderCount30Days';
  //     if (this.salesIcon == 'arrow-round-down') {
  //       this.postParam.sort = 'desc';
  //     } else {
  //       this.postParam.sort = 'asc';
  //     }
  //     this.getData();
  //   } else if (num == this.selectFlag && num == 14) {
  //     // 佣金升降
  //     this.commissionIcon = this.commissionIcon == 'arrow-round-down' ? 'arrow-round-up' : 'arrow-round-down';
  //     this.data = [];
  //     this.page = 1;
  //     this.postParam.sortName = 'pcCommission';
  //     if (this.commissionIcon == 'arrow-round-down') {
  //       this.postParam.sort = 'desc';
  //     } else {
  //       this.postParam.sort = 'asc';
  //     }
  //     this.getData();
  //   } else if (num != this.selectFlag) {
  //     this.selectFlag = num;
  //     this.data = [];
  //     this.page = 1;
  //     this.postParam.sort = 'desc';
  //     switch (num) {

  //       case 0:
  //         this.postParam.sortName = 'inOrderCount30Days';
  //         break;
  //       case 14:
  //         this.postParam.sortName = 'pcCommission';
  //         break;
  //       case 4:
  //         this.postParam.sortName = 'pcPrice';
  //         break;
  //     }
  //     this.getData();
  //   }
  // }

  /**
   * 商品点击事件
   * @param item 
   */
  onItem(item) {

  }
}
