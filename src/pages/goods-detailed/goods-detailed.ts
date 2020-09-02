import { HelperProvider } from './../../providers/helper/helper';
import { TabsPage } from './../tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
import { TaobaoServiceProvider } from '../../providers/taobao-service/taobao-service';

/**
 * Generated class for the GoodsDetailedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'GoodsDetailedPage',
  segment: 'goods-detailed/:goods'
})
@Component({
  selector: 'page-goods-detailed',
  templateUrl: 'goods-detailed.html',
})
export class GoodsDetailedPage {

  @ViewChild("header") header;

  hosGoods1 = [];
  hosGoods2 = [];
  hosGoods3 = [];
  hosGoods4 = [];

  goods_detailed: any;
  goods: any;
  // tbk_pwd:string = "如果没有获取到，请重新打开页面";
  isWXBrowser = false;
  url;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private popoverCtrl: PopoverController,
    private loadingService: LoadingServiceProvider,
    private globalData: GlobalDataProvider,
    private helper: HelperProvider,
    private taobaoService: TaobaoServiceProvider) {
  }

  ionViewDidLoad() {
   this.isWXBrowser =  this.helper.isWXBrowser();
    this.loadingService.showLoading();
    this.goods = this.navParams.get('goods');
    // , { detail: 1, para: encodeURI(this.goods) }
    this.httpService.get('/goodsDetailed.json').then(res => {
  
      if (res && res['data']) {
        if(res['data'].coupon_info){
          let strs = res['data'].coupon_info.split("减");
          if(strs.length > 0){
            res['data'].zk_final_price = (res['data'].zk_final_price - parseInt(strs[1])).toFixed(2);
          }
          res['data'].small_images.unshift(res['data'].pict_url)
        }
        
        this.goods_detailed = res['data'];

        this.goods_detailed['tbk_pwd'] = "￥pSpYcWmMsx5￥";
        this.url = "https://s.click.taobao.com/jkIhxwu";
      }
     
    })

    this.httpService.get('/super.json').then(res => {
      this.loadingService.hideLoading();
      if (res && res['result_list'] && res['result_list'].length > 3) {
        try {
          this.hosGoods1 = res['result_list'].slice(0, 3);
          this.hosGoods2 = res['result_list'].slice(3, 6);
          this.hosGoods3 = res['result_list'].slice(6, 9);
          this.hosGoods4 = res['result_list'].slice(9, 12);
        } catch (err) {
          console.log(err)
        }

      }
    })
  }


  onTaobao(){
    if(this.helper.isMobile()){
      this.taobaoService.show(this.url,'tb').catch(()=>{
        this.helper.openUrlByBrowser(this.url);
      });
    } else {
      this.helper.openUrlByBrowser(this.url);
    }

  }

  /**
   * 控制
   * @param e 
   */
  scrollEvent(e) {
    let opacity = (300 - e.scrollTop) / 300;//设置滚动距离300的时候导航栏消失
    this.header._elementRef.nativeElement.style.opacity = opacity;
  }


  /**
   * 分享
   */
  onShare() {
    let modal = this.popoverCtrl.create('ShareGoodsPage', { value: this.goods_detailed }, { cssClass: 'share-goods' });
    modal.present();
  }

  /**
   * 客服点击事件
   */
  onKefu() {
    let modal = this.popoverCtrl.create('CustomerServicePage', {}, { cssClass: 'share-goods' });
    modal.present();
  }

  /**
   * 口令购买
   */
  onBuy() {//
    let modal = this.popoverCtrl.create('BuyGoodsPage', { value:  this.goods_detailed['tbk_pwd'] ,title: '口令购买'}, { cssClass: 'share-goods' });
    modal.present();
  }

  /**
   * 喜欢点击事件
   * @param item 
   */
  onLick(item: any) {
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


  /**
   * 首页
   */
  onHome() {
    this.navCtrl.setRoot(TabsPage, { value: 0 });
  }

}
