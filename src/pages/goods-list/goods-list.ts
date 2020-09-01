import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { HelperProvider } from '../../providers/helper/helper';


/**
 * Generated class for the GoodsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'GoodsListPage',
  segment: 'goods-list/:value'
})
@Component({
  selector: 'page-goods-list',
  templateUrl: 'goods-list.html',
})
export class GoodsListPage {

  text: string = '';
  searchtext: string;
  priceIcon: string = 'arrow-round-down';
  selectFlag: number = 0; //如果没有点击排序，默认为无
  page: number = 1;
  pagesize: number = 20;
  data = [];
  sort: string = 'tk_total_commi_des';//排序
  userInfo: any;
  role: number = 0.3;//分成
  postParam = {
    para: '',
    page: 1,
    pagesize: 20,
    sort: 'tk_total_commi_des',
    is_tmall: 0
  }
  ban = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private storageService: StorageServiceProvider,
    private loadingService: LoadingServiceProvider,
    private helper: HelperProvider,
    private events: Events) {
  }

  ionViewDidLoad() {
    this.userInfo = this.storageService.read("UserInfo");
    // 是否天猫商品
    if (this.navParams.get('tmall') == 'Y') {
      this.postParam.is_tmall = 1;
    }
    this.text = this.navParams.get('value') ? decodeURI(this.navParams.get('value')) : '';
    this.searchtext = this.text;
    this.role = this.storageService.read('roleNumber');
    this.getData();
  }


  /**
   *获取数据，传入排序
   * @param sort 
   */
  getData(infiniteScroll?: any) {
    if (!infiniteScroll) {
      this.loadingService.showLoading();
    }
    this.postParam.para = encodeURI(this.text ? this.text : '精选');
    this.postParam.page = this.page;
    this.postParam.pagesize = this.pagesize;
    this.postParam.sort = this.sort;
    this.httpService.post('/goods/getSuper', this.postParam).then(res => {
      this.loadingService.hideLoading();
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
      if (res && res['result_list'] && res['result_list'].length > 0) {
        res['result_list'].forEach(element => {
          element['commission'] = (element.commission_rate / 10000 * element.zk_final_price * this.role).toFixed(2);
          if (element.coupon_info) {
            let strs = element.coupon_info.split("减");
            element.couponPrice = parseInt(strs[1]);
            element.zk_final_price = (element.zk_final_price - parseInt(strs[1])).toFixed(2);
          }

        });

        this.data = this.data.concat(res['result_list']);

      } else {
        this.ban = true;
      }
    })
  }

  /**
   * 排序切换
   * @param num 
   */
  filter(num: number) {

    if (num == this.selectFlag && num == 3) {
      this.priceIcon = this.priceIcon == 'arrow-round-down' ? 'arrow-round-up' : 'arrow-round-down';
      this.data = [];
      this.page = 1;
      if (this.priceIcon == 'arrow-round-down') {
        this.sort = 'price_des';
      } else {
        this.sort = 'price_asc';
      }
      this.getData();
    } else if (num != this.selectFlag) {
      this.selectFlag = num;
      this.data = [];
      this.page = 1;
      switch (num) {
        case 0:
          this.sort = 'tk_total_sales_des';
          break;
        case 1:
          this.sort = 'total_sales_des';
          break;
        case 2:
          this.sort = 'tk_rate_des';
          break;
        case 3:
          this.sort = 'price_des';
          break;
      }
      this.getData();
    }
  }

  /**
   * 搜索事件
   */
  onSearch() {
    this.text = this.searchtext;
    this.data = [];
    this.page = 1;
    this.getData();
    setTimeout(() => {
      this.searchtext = this.text;
    }, 500)
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
   * 商品点击事件
   * @param item 
   */
  onItem(item: any) {
    if(!this.helper.isLogin()){
      this.events.publish('login:go');
      return;
    }
    // 检查是否以渠道授权
    // if (!this.userInfo.relation_id && !this.userInfo.userInfo.tb_user_id) {
    //   this.alertService.showConfirm('是否立即授权?','检测到你的账号还没有进行与淘宝授权，为了更好体验功能，请尽快授权。','稍后提示','立即授权').then(() => {
    //     this.navCtrl.push('AuthHorizePage');
    //   });
    //   return;
    // }
    this.navCtrl.push('GoodsDetailedPage', { goods: item.num_iid });
    // if(!this.helper.isMobile()){
    //   this.navCtrl.push('GoodsDetailedPage', { goods: item.num_iid });
    // } else {
    //   this.loadingService.showLoading();
    //   this.httpService.post('/goods/getTheHcapi', { token: this.globalData.token, para: encodeURI(item.num_iid) }).then((res:any) => {
    //     this.loadingService.hideLoading();
    //     if (res && res.data) {
    //       this.themeableService.create(res.data.coupon_short_url);
    //     }
    //   })
    // }
  }


}
