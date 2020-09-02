import { HelperProvider } from './../../providers/helper/helper';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';

/**
 * Generated class for the SpecialGoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-special-goods',
  templateUrl: 'special-goods.html',
})
export class SpecialGoodsPage {
  segmentModel: string = '热销';
  pagesize: number = 20;//商品数量
  oneData = { list: [], page: 1, ban: false };
  towData = { list: [], page: 1, ban: false };
  threeData = { list: [], page: 1, ban: false };
  fourData = { list: [], page: 1, ban: false };
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private loadingService: LoadingServiceProvider,
    private helper: HelperProvider,
    private events: Events) {

  }

  ionViewDidLoad() {
    this.getOneData();
    this.getTowData();
    this.getThreeData();
    this.getFourData();
  }

  /**
   * 获取热销数据
   * @param infiniteScroll 
   */
  getOneData(infiniteScroll?) {
    if (!infiniteScroll) {
      this.loadingService.showLoading();
    }
    // , { page: this.oneData.page, pagesize: this.pagesize, topcate: encodeURI('热销') }
    this.httpService.get('/products.json').then((res: any) => {
      if (infiniteScroll) {
        infiniteScroll.complete();
      } else {
        this.loadingService.hideLoading();
      }
      if (res && res.data) {
        res.data.forEach(element => {//计算最终价格
          element['amount'] = (element.zk_final_price - element.coupon_amount).toFixed(2);
        });
        this.oneData.list = this.oneData.list.concat(res.data);
        if (res.data && res.count < this.pagesize) {
          //如果已无更多
          this.oneData.ban = true;
        }
      }
    })

  }


  /**
  * 获取优质品数据
  * @param infiniteScroll 
  */
  getTowData(infiniteScroll?) {
    // , { page: this.towData.page, pagesize: this.pagesize, topcate: encodeURI('优质品') }
    this.httpService.get('/products.json').then((res: any) => {
      if (infiniteScroll) {
        infiniteScroll.complete();
      } 
      if (res && res.data) {
        res.data.forEach(element => {//计算最终价格
          element['amount'] = (element.zk_final_price - element.coupon_amount).toFixed(2);
        });
        this.towData.list = this.towData.list.concat(res.data);
        if (res.data && res.count < this.pagesize) {
          //如果已无更多
          this.towData.ban = true;
        }
      }
    })

  }

  /**
  * 获取母婴数据
  * @param infiniteScroll 
  */
  getThreeData(infiniteScroll?) {

    // , { page: this.threeData.page, pagesize: this.pagesize, topcate: encodeURI('母婴') }
    this.httpService.get('/products.json').then((res: any) => {
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
      if (res && res.data) {
        res.data.forEach(element => {//计算最终价格
          element['amount'] = (element.zk_final_price - element.coupon_amount).toFixed(2);
        });
        this.threeData.list = this.threeData.list.concat(res.data);
        if (res.data && res.count < this.pagesize) {
          //如果已无更多
          this.threeData.ban = true;
        }
      }
    })

  }

  /**
  * 获取特价数据
  * @param infiniteScroll 
  */
  getFourData(infiniteScroll?) {

    // , { page: this.fourData.page, pagesize: this.pagesize, topcate: encodeURI('特价') }
    this.httpService.get('/products.json').then((res: any) => {
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
      if (res && res.data) {
        res.data.forEach(element => {//计算最终价格
          element['amount'] = (element.zk_final_price - element.coupon_amount).toFixed(2);
        });
        this.fourData.list = this.fourData.list.concat(res.data);
        if (res.data && res.count < this.pagesize) {
          //如果已无更多
          this.fourData.ban = true;
        }
      }
    })

  }

 /**
   * 商品点击事件
   * @param item 
   */
  onGoods(item: any) {
    if (!this.helper.isLogin()) {
      this.events.publish('login:go');
      return;
    }
    this.navCtrl.push('GoodsDetailedPage', { goods: item.item_id });
  }

  /**
   * 
   * @param infiniteScroll 上拉加载
   */
  doInfinite(infiniteScroll) {

    switch (this.segmentModel) {
      case '热销':
        this.oneData.page++;
        this.getOneData(infiniteScroll);
        break;

      case '优质品':
        this.towData.page++;
        this.getTowData(infiniteScroll);
        break;
      case '母婴':
        this.threeData.page++;
        this.getThreeData(infiniteScroll);
        break;
      case '特价':
        this.fourData.page++;
        this.getFourData(infiniteScroll);
        break;
    }
  }

  /**
   * 滚动回顶部
   */
  scrollToTop(){
    this.content.scrollToTop();
  }
}
