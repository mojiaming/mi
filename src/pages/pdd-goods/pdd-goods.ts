import { Storage } from '@ionic/storage';
import { HelperProvider } from './../../providers/helper/helper';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { TaobaoServiceProvider } from '../../providers/taobao-service/taobao-service';

/**
 * Generated class for the PddGoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pdd-goods',
  templateUrl: 'pdd-goods.html',
})
export class PddGoodsPage {
  searchtext: string = '';
  themeList: Array<any> = [];//主题商品集合
  allTopGoodsList: Array<any> = [];//爆款商品集合
  topGoodsList: Array<any> = [];//爆款商品集合
  @ViewChild('slides') slides: Slides;
  ban = false;
  role: number = 0.3;//分成
  name = null;
  postParam = {
    offset: 0,
    sortType: 1,
    limit: 20
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private loadingService: LoadingServiceProvider,
    private storageService: StorageServiceProvider,
    private helper: HelperProvider,
    private taobaoService: TaobaoServiceProvider,
    private storage: Storage) {

      this.storage.get('pdd:themeList').then(res => {
        if(res && this.themeList.length == 0){
          this.themeList = res;
        }
      })

      this.storage.get('pdd:allTopGoodsList').then(res => {
        if(res && this.allTopGoodsList.length == 0){
          this.allTopGoodsList = res;
          this.topGoodsList = this.topGoodsList.concat(this.allTopGoodsList.slice(this.postParam.offset, this.postParam.limit));
        }
      })
  }

  async ionViewDidLoad() {
    // this.loadingService.showLoading();

    // 创建pid
    if (!this.storageService.read('pddPid')) {
      await this.pidGenerate();
    }



    this.role = this.storageService.read('roleNumber');

    this.name = this.navParams.get('name');
    if (this.name) {
      this.getData('/pdd/getRecommend/' + this.navParams.get('value'));
    } else {
      // 获取类目商品
      this.httpService.get('/pdd/getThemeList').then((res: any) => {
        if (res && res.msg == 'OK') {
          this.themeList = res.list;
          this.storage.set('pdd:themeList',this.themeList);
        }
      })
      this.getData('/pdd/getTopGoodsList');
    }


  }


  pidGenerate(): Promise<any> {
    return new Promise((resolve) => {
      this.httpService.get('/pdd/pidGenerate').then((res: any) => {
        if (res && res.msg == 'OK') {
          this.storageService.write('pddPid', 'Y');
        }
        resolve(res);
      });
    });
  }

  /**
   * 获取爆款数据
   */
  getData(url) {
    this.httpService.get(url).then((res: any) => {
      // this.loadingService.hideLoading();
      if (res && res.msg == 'OK') {

        res.list.forEach(element => {
          if (element.promotion_rate) {
            element.commission = (element.promotion_rate / 1000 * element.min_group_price / 100 * this.role).toFixed(2);
            element.min_group_price = (element.min_group_price - element.coupon_discount).toFixed(2);
          }

        });
        this.allTopGoodsList = res.list;
        this.storage.set('pdd:allTopGoodsList',this.allTopGoodsList);
        this.topGoodsList = this.topGoodsList.concat(this.allTopGoodsList.slice(this.postParam.offset, this.postParam.limit));
      }
    })
  }

  /**
   * 主题商品点击事件
   * @param item 
   */
  onDaili(item) {
    // console.log(item)
    this.navCtrl.push('PddGoodsListPage', { item: item });

  }

  /**
   * 搜索事件
   */
  onSearch() {
    if (this.searchtext) {
      this.navCtrl.push('PddGoodsListPage', { value: this.searchtext });
    }
  }


  //页面进入时启动自动播放
  ionViewDidEnter() {
    if (this.slides) {
      this.slides.startAutoplay();
    }
  }

  /**
  * 上拉加载
  * @param infiniteScroll 
  */
  doInfinite(infiniteScroll) {
    this.postParam.offset += 20;
    this.postParam.limit += 20;
    if (this.allTopGoodsList.length >= this.postParam.limit) {
      this.topGoodsList = this.topGoodsList.concat(this.allTopGoodsList.slice(this.postParam.offset, this.postParam.limit));
    } else {
      this.topGoodsList = this.topGoodsList.concat(this.allTopGoodsList.slice(this.postParam.offset, this.allTopGoodsList.length));
    }

    infiniteScroll.complete();
    if (this.allTopGoodsList.length < this.postParam.limit) {
      this.ban = true;
    }
  }



  //页面离开时停止自动播放
  ionViewDidLeave() {
    if (this.slides) {
      this.slides.stopAutoplay();
    }
  }

  /**
   * 商品点击事件
   * @param item 
   */
  onItem(item) {
    this.navCtrl.push('PddGoodsDetailedPage', { value: item.goods_id });
    // if (!this.helper.isMobile()) {
    //   this.navCtrl.push('PddGoodsDetailedPage', { value: item.goods_id });
    // } else {
    //   this.loadingService.showLoading();
    //   this.httpService.get('/pdd/urlGenerate/' + item.goods_id).then((res: any) => {
    //     this.loadingService.hideLoading();
    //     if (res && res.msg == 'OK') {
    //       this.themeableService.create(res.data.mobile_short_url);
    //     }
    //   })
    // }

  }

  /**
   * 运营频道商品查询
   * @param channelType 
   */
  onRecommend(channelType, name) {
    this.navCtrl.push('PddGoodsPage', { value: channelType, name: name });
  }

  /**
   * 生成多多进宝频道推广
   * @param resourceType 
   */
  ongetResourceUrl(resourceType) {
    this.loadingService.showLoading();
    this.httpService.get('/pdd/getResourceUrl/' + resourceType).then((res: any) => {
      this.loadingService.hideLoading();
      if (res && res.msg == 'OK') {
        if(this.helper.isMobile()){
          this.taobaoService.show(res.data.url,'pdd').catch(()=>{
            this.helper.openUrlByBrowser(res.data.short_url);
          });
        } else {
          this.helper.openUrlByBrowser(res.data.short_url);
        }
        
      }
    })
  }
}
