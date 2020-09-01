import { HelperProvider } from './../../providers/helper/helper';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { TaobaoServiceProvider } from '../../providers/taobao-service/taobao-service';

/**
 * Generated class for the PddGoodsDetailedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'PddGoodsDetailedPage',
  segment: 'pdd-goods-detailed/:value'
})
@Component({
  selector: 'page-pdd-goods-detailed',
  templateUrl: 'pdd-goods-detailed.html',
})
export class PddGoodsDetailedPage {
  urls: any;
  data: any = null;//详情数据
  similar1: Array<any> = [];//相似商品
  similar2: Array<any> = [];//相似商品
  similar3: Array<any> = [];//相似商品
  similar4: Array<any> = [];//相似商品
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private loadingService: LoadingServiceProvider,
    private helper: HelperProvider,
    private taobaoService: TaobaoServiceProvider) {
  }

  ionViewDidLoad() {

    this.httpService.get('/pdd/urlGenerate/' + this.navParams.get('value')).then((res: any) => {
      this.loadingService.hideLoading();
      if (res && res.msg == 'OK') {
        this.urls = res.data;
      }
    })
    this.loadingService.showLoading();
    this.httpService.get('/pdd/getGoodsDetail/' + this.navParams.get('value')).then((res: any) => {
      this.loadingService.hideLoading();
      if (res && res.data && res.data.goods_details && res.data.goods_details.length > 0) {

        this.data = res.data.goods_details[0];

        this.data.coupon_start_time = new Date(this.data.coupon_start_time * 1000).toLocaleDateString();
        this.data.coupon_end_time = new Date(this.data.coupon_end_time * 1000).toLocaleDateString();
        this.getSimilar();
      }
    })



  }

  /**
   * 获取相似商品
   */
  getSimilar() {
    this.httpService.post('/pdd/getSearch', { page: 1, pageSize: 12, optId: this.data.opt_id }).then((res: any) => {

      if (res && res.list && res.list.length > 0) {
        this.similar1 = res.list.slice(0, 3);
        this.similar2 = res.list.slice(3, 6);
        this.similar3 = res.list.slice(6, 9);
        this.similar4 = res.list.slice(9, 12);
      }
    })
  }


  /**
  * 首页
  */
  onHome() {
    this.navCtrl.setRoot(TabsPage, { value: 0 });
  }

  /**
   * 购买
   */
  onBuy() {
    if(this.helper.isMobile()){
      this.taobaoService.show(this.urls.url,'pdd').catch(()=>{
        this.helper.openUrlByBrowser(this.urls.mobile_short_url);
      });
    } else {
      this.helper.openUrlByBrowser(this.urls.mobile_short_url);
    }

  }

  onLick(item) {
    this.navCtrl.push('PddGoodsDetailedPage', { value: item.goods_id });
  }

}
