import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { HelperProvider } from '../../providers/helper/helper';

/**
 * Generated class for the HotGoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hot-goods',
  templateUrl: 'hot-goods.html',
})
export class HotGoodsPage {
  segmentModel: string = '1';
  role: number = 0.4;//分成
  oneData = { list: [], page: 0, pagesize: 20, ban: false };
  towData = { list: [], page: 0, pagesize: 20, ban: false };
  allOneData = [];//前100数据
  allTowData = [];//全天前100数据
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private loadingService: LoadingServiceProvider,
    private storageService: StorageServiceProvider,
    private helper: HelperProvider,
    private events: Events) {
  }

  ionViewDidLoad() {
    this.role = this.storageService.read('roleNumber');
    this.getOneData();
    this.getTowData();
  }

  /**
   * 获取两小时数据
   */
  getOneData() {
    this.loadingService.showLoading();
    this.httpService.post('/dtk/getRanKing', { rankType: 1 }).then((res: any) => {
      this.loadingService.hideLoading();
      if (res && res.msg == 'OK' && res.list) {
        res.list.forEach(element => {
          element.commission = (element.commissionRate / 100 * element.actualPrice * this.role).toFixed(2);
        });
        // this.oneData.list = this.oneData.list.concat(res.list);
        this.allOneData = res.list;
        this.oneData.list = this.oneData.list.concat(this.allOneData.slice(this.oneData.page, this.oneData.pagesize));
      }


    })
  }

  /**
   * 获取全天数据
   */
  getTowData() {
    this.loadingService.showLoading();
    this.httpService.post('/dtk/getRanKing', { rankType: 4 }).then((res: any) => {
      this.loadingService.hideLoading();
      if (res && res.msg == 'OK' && res.list) {
        res.list.forEach(element => {
          element.commission = (element.commissionRate / 100 * element.actualPrice * this.role).toFixed(2);
        });
        this.allTowData = res.list;
        this.towData.list = this.towData.list.concat(this.allTowData.slice(this.towData.page, this.towData.pagesize));
      }
    })
  }

  /**
  * 上拉加载
  * @param infiniteScroll 
  */
  doInfinite(infiniteScroll) {
    if (this.segmentModel == '1') {
      this.oneData.page += 20;
      this.oneData.pagesize += 20;
      if (this.allOneData.length >= this.oneData.pagesize) {
        this.oneData.list = this.oneData.list.concat(this.allOneData.slice(this.oneData.page, this.oneData.pagesize));
      } else {
        this.oneData.list = this.oneData.list.concat(this.allOneData.slice(this.oneData.page, this.allOneData.length));
      }

      infiniteScroll.complete();
      if (this.allOneData.length < this.oneData.pagesize) {
        this.oneData.ban = true;
      }
    } else if (this.segmentModel == '2') {
      this.towData.page += 20;
      this.towData.pagesize += 20;
      if (this.allTowData.length >= this.towData.pagesize) {
        this.towData.list = this.towData.list.concat(this.allTowData.slice(this.towData.page, this.towData.pagesize));
      } else {
        this.towData.list = this.towData.list.concat(this.allTowData.slice(this.towData.page, this.allTowData.length));
      }

      infiniteScroll.complete();
      if (this.allTowData.length < this.towData.pagesize) {
        this.towData.ban = true;
      }
    }

  }
 /**
   * 滚动回顶部
   */
  scrollToTop(){
    this.content.scrollToTop();
  }

   /**
   * 商品点击事件
   * @param item 
   */
  onGoods(item) {
    if(!this.helper.isLogin()){
      this.events.publish('login:go');
      return;
    }
    this.navCtrl.push('GoodsDetailedPage', { goods: item.goodsId });
  }
}
