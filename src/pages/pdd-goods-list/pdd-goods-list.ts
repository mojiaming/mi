import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PddGoodsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'PddGoodsListPage',
  segment: 'pdd-goods-list/:value'
})
@Component({
  selector: 'page-pdd-goods-list',
  templateUrl: 'pdd-goods-list.html',
})
export class PddGoodsListPage {
  searchtext: string = '';
  priceIcon: string = 'arrow-round-down';
  salesIcon: string = 'arrow-round-down';
  commissionIcon: string = 'arrow-round-down';
  selectFlag: number = 0; //如果没有点击排序，默认为无
  page: number = 1;
  pageSize: number = 20;
  data = [];
  sortType: string = '0';//排序
  role: number = 0.3;//分成
  postParam = {
    keyword: '',
    page: 1,
    pageSize: 20,
    sortType: '0'
  }
  ban = false;
  item: any = null;//主题商品
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private loadingService: LoadingServiceProvider,
    private storageService: StorageServiceProvider) {
  }

  ionViewDidLoad() {
    this.searchtext = this.navParams.get('value') ? decodeURI(this.navParams.get('value')) : '';
    this.loadingService.showLoading();
    this.role = this.storageService.read('roleNumber');
    if (this.navParams.get('item')) {
      this.item = this.navParams.get('item');
      // , { theme_id: this.item.id }
      this.httpService.get('/pddSearch.json').then((res: any) => {
        this.loadingService.hideLoading();
        if (res && res.msg == 'OK' && res.list) {
          res.list.forEach(element => {
            if (element.promotion_rate) {
              element.commission = (element.promotion_rate / 1000 * element.min_group_price / 100 * this.role).toFixed(2);
            }
          });
          this.data = res.list;
        }
        this.ban = true;
      })
    } else {
      this.getData();
    }

  }



  /**
   *获取数据，传入排序
   * @param sort 
   */
  getData(infiniteScroll?: any) {
    if (!infiniteScroll) {
      this.loadingService.showLoading();
    }
    this.postParam.keyword = this.searchtext;
    this.postParam.page = this.page;
    this.postParam.pageSize = this.pageSize;
    this.postParam.sortType = this.sortType;
    this.httpService.post('/pdd/getSearch', this.postParam).then((res: any) => {
      this.loadingService.hideLoading();
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
      if (res && res.list && res.list.length > 0) {
        res.list.forEach(element => {
          if (element.promotion_rate) {
            element.commission = (element.promotion_rate / 1000 * element.min_group_price / 100 * this.role).toFixed(2);
          }
        });

        this.data = this.data.concat(res.list);

      } else {
        this.ban = true;
      }
    })
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
  filter(num: number) {
    // 价格升降
    if (num == this.selectFlag && num == 4) {
      this.priceIcon = this.priceIcon == 'arrow-round-down' ? 'arrow-round-up' : 'arrow-round-down';
      this.data = [];
      this.page = 1;
      if (this.priceIcon == 'arrow-round-down') {
        this.sortType = '4';
      } else {
        this.sortType = '3';
      }
      this.getData();
    } else if (num == this.selectFlag && num == 6) {
      // 销量升降
      this.salesIcon = this.salesIcon == 'arrow-round-down' ? 'arrow-round-up' : 'arrow-round-down';
      this.data = [];
      this.page = 1;
      if (this.salesIcon == 'arrow-round-down') {
        this.sortType = '6';
      } else {
        this.sortType = '5';
      }
      this.getData();
    } else if (num == this.selectFlag && num == 14) {
      // 佣金升降
      this.commissionIcon = this.commissionIcon == 'arrow-round-down' ? 'arrow-round-up' : 'arrow-round-down';
      this.data = [];
      this.page = 1;
      if (this.commissionIcon == 'arrow-round-down') {
        this.sortType = '14';
      } else {
        this.sortType = '13';
      }
      this.getData();
    } else if (num != this.selectFlag) {
      this.selectFlag = num;
      this.data = [];
      this.page = 1;
      switch (num) {
        case 0:
          this.sortType = '0';
          break;
        case 6:
          this.sortType = '6';
          break;
        case 14:
          this.sortType = '14';
          break;
        case 4:
          this.sortType = '4';
          break;
      }
      this.getData();
    }
  }

  /**
   * 商品点击事件
   * @param item 
   */
  onItem(item) {
    this.navCtrl.push('PddGoodsDetailedPage', { value: item.goods_id });
  }

}
