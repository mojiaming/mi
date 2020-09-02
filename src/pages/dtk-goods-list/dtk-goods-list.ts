import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { HelperProvider } from '../../providers/helper/helper';

/**
 * Generated class for the DtkGoodsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dtk-goods-list',
  templateUrl: 'dtk-goods-list.html',
})
export class DtkGoodsListPage {
  // priceIcon: string = 'arrow-round-down';
  @ViewChild(Content) content: Content;
  data = [];//商品列表
  role: number = 0.4;//分成
  segmentModel: string = '1,9,6,3,4,5,8,7,10,2,11,12,14,13';
  userInfo: any;
  Categoryhosts = [
    { cname: "推荐", cid: "1,9,6,3,4,5,8,7,10,2,11,12,14,13", data: [], pageId: 1, ban: false },
    { cid: 6, cname: "美食", data: [], pageId: 1, ban: false },
    { cid: 3, cname: "美妆", data: [], pageId: 1, ban: false },
    { cid: 4, cname: "居家日用", data: [], pageId: 1, ban: false },
    { cid: 5, cname: "鞋品", data: [], pageId: 1, ban: false },
    { cid: 9, cname: "男装", data: [], pageId: 1, ban: false },
    { cid: 8, cname: "数码家电", data: [], pageId: 1, ban: false },
    { cid: 7, cname: "文娱车品", data: [], pageId: 1, ban: false },
    { cid: 10, cname: "内衣", data: [], pageId: 1, ban: false },
    { cid: 2, cname: "母婴", data: [], pageId: 1, ban: false },
    { cid: 11, cname: "箱包", data: [], pageId: 1, ban: false },
    { cid: 12, cname: "配饰", data: [], pageId: 1, ban: false },
    { cid: 14, cname: "家装家纺", data: [], pageId: 1, ban: false },
    { cid: 13, cname: "户外运动", data: [], pageId: 1, ban: false }
  ];
  postParam = {
    keyWords: '',
    cids: null,
    juHuaSuan: null,
    haitao: null,
    pageId: 1,
    sort: '0'
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingService: LoadingServiceProvider,
    private httpService: HttpServiceProvider,
    private storageService: StorageServiceProvider,
    private helper: HelperProvider,
    private events: Events) {
  }

  ionViewDidLoad() {
    this.userInfo = this.storageService.read("UserInfo");
    if (this.navParams.get('juhuasuan') && this.navParams.get('juhuasuan') == 'Y') {
      this.postParam.juHuaSuan = 1;
    }

    if (this.navParams.get('haitao') && this.navParams.get('haitao') == 'Y') {
      this.postParam.haitao = 1;
    }
    this.role = this.storageService.read('roleNumber');
    this.getData(0);
  }



  /**
   * 获取数据
   */
  getData(index, infiniteScroll?: any) {
    if (!infiniteScroll) {
      this.loadingService.showLoading();
    }

    this.postParam.cids = this.Categoryhosts[index].cid;
    this.postParam.pageId = this.Categoryhosts[index].pageId;

    this.httpService.get('/products.json').then((res: any) => {
      this.loadingService.hideLoading();
      if (res && res.msg == 'OK' && res.list) {
        res.list.forEach(element => {
          element.commission =(element.commissionRate / 100 * element.actualPrice * this.role).toFixed(2);
        });
        this.Categoryhosts[index].data = this.Categoryhosts[index].data.concat(res.list);
      }
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
      if (!res.list) {
        this.Categoryhosts[index].ban = true;
      }
    })
  }

  /**
   * 菜单切换事件
   */
  segmentChanged() {
    this.content.scrollToTop();
    for (let i = 0; i < this.Categoryhosts.length; i++) {
      // if(this.Categoryhosts[i].cid == this.segmentModel && i != 0){
      //   this.postParam.keyWords = this.Categoryhosts[i].cname;
      // }
      if (this.Categoryhosts[i].cid == this.segmentModel && this.Categoryhosts[i].data.length == 0) {
        this.getData(i)
      }
    }

  }

  /**
   * 上拉加载
   * @param event 
   * @param index 
   */
  doInfinite(event, index) {
    ++this.Categoryhosts[index].pageId;
    this.getData(index, event);
  }

  /**
   * 商品点击事件
   * @param item 
   */
  onItem(item) {
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

    this.navCtrl.push('GoodsDetailedPage', { goods: item.goodsId });
    // if(!this.helper.isMobile()){
    //   this.navCtrl.push('GoodsDetailedPage', { goods: item.goodsId });
    // } else {
    //   this.loadingService.showLoading();
    //   this.httpService.post('/goods/getTheHcapi', { token: this.globalData.token, para: encodeURI(item.goodsId) }).then((res:any) => {
    //     this.loadingService.hideLoading();
    //     if (res && res.data) {
    //       this.themeableService.create(res.data.coupon_short_url);
    //     }
    //   })
    // }

  }
}
