import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';


/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  text: string = '';//搜索文本
  hots = [];
  hosGoodsList = [];
  qualityList = [];
  userInfo: any;
  segmentModel = '1';//选择平台

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private storage: Storage,
    private storageService: StorageServiceProvider) {
    this.storage.get('searchHot').then(res => {
      if (res && this.hots.length == 0) {
        this.hots = res;
      }
    })
    this.storage.get('searchHosGoods').then(res => {
      if (res && res.length == 12 && this.hosGoodsList.length == 0) {
        this.hosGoodsList = res
      }
    })

    this.storage.get('searchQuality').then(res => {
      if (res && res.length == 12 && this.qualityList.length == 0) {
        this.qualityList = res;
      }
    })
  }



  ionViewDidLoad() {


    this.httpService.get('/dtk/getHot').then((res: any) => {
      if (res && res.msg == 'OK' && res.data && res.data.hotWords.length > 20) {
        this.hots = res.data.hotWords.slice(0, 20);
        this.storage.set('searchHot', this.hots);
      }
    })
    this.userInfo = this.storageService.read("UserInfo");
    // 获取轮播商品
    this.httpService.post('/goods/products', { topcate: encodeURI('热销'), page: 1, pagesize: 12 }).then(res => {
      if (res && res['data'] && res['data'].length == 12) {
        res['data'].forEach(element => {//计算最终价格
          element['amount'] = (element.zk_final_price - element.coupon_amount).toFixed(2);
        });
        this.hosGoodsList = res['data'];
        this.storage.set('searchHosGoods', res['data']);
      }
    })

    this.httpService.post('/goods/products', { topcate: encodeURI('优质品'), page: 1, pagesize: 12 }).then(res => {
      if (res && res['data'] && res['data'].length == 12) {
        res['data'].forEach(element => {//计算最终价格
          element['amount'] = (element.zk_final_price - element.coupon_amount).toFixed(2);
        });
        this.qualityList = res['data'];
        this.storage.set('searchQuality', res['data']);
      }
    })

  }

  /**
   * 搜索事件
   */
  onSearch() {
    if (this.segmentModel == '1') {
      this.navCtrl.push('GoodsListPage', { value: this.text });
    } else if (this.segmentModel == '2') {
      this.navCtrl.push('PddGoodsListPage', { value: this.text });
    } else if (this.segmentModel == '3') {
      this.navCtrl.push('JdGoodsListPage', { value: this.text });
    }

  }


  /**
   * 热门标签点击
   * @param name 
   */
  onHos(name: string) {
    if (this.segmentModel == '1') {
      this.navCtrl.push('GoodsListPage', { value: name });
    } else if (this.segmentModel == '2') {
      this.navCtrl.push('PddGoodsListPage', { value: name });
    } else if (this.segmentModel == '3') {
      this.navCtrl.push('JdGoodsListPage', { value: name });
    }
  }


  onGoods(item) {
    // 检查是否以渠道授权
    // if (!this.userInfo.relation_id && !this.userInfo.userInfo.tb_user_id) {
    //   this.alertService.showConfirm('是否立即授权?','检测到你的账号还没有进行与淘宝授权，为了更好体验功能，请尽快授权。','稍后提示','立即授权').then(() => {
    //     this.navCtrl.push('AuthHorizePage');
    //   });
    //   return;
    // }
    this.navCtrl.push('GoodsDetailedPage', { goods: item.item_id });
    // if(!this.helper.isMobile()){
    //   this.navCtrl.push('GoodsDetailedPage', { goods: item.item_id });
    // } else {
    //   this.loadingService.showLoading();
    //   this.httpService.post('/goods/getTheHcapi', { token: this.globalData.token, para: encodeURI(item.item_id) }).then((res:any) => {
    //     this.loadingService.hideLoading();
    //     if (res && res.data) {
    //       this.themeableService.create(res.data.coupon_short_url);
    //     }
    //   })
    // }
  }

  ionViewWillEnter() {
    // this.statusBar.backgroundColorByHexString("#9999ff");

  }

  ionViewWillLeave() {
    // this.statusBar.backgroundColorByHexString('#f53d3d');
  }
}
