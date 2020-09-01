import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { HelperProvider } from '../../providers/helper/helper';

/**
 * Generated class for the JdGoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jd-goods',
  templateUrl: 'jd-goods.html',
})
export class JdGoodsPage {
  searchtext: string = '';
  topGoodsList: Array<any> = [];//爆款商品集合
  @ViewChild('slides') slides: Slides;
  ban = false;
  role: number = 0.3;//分成
  name = null;
  postParam = {
    pageIndex: 1,
    pageSize: 20
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private loadingService: LoadingServiceProvider,
    private storageService: StorageServiceProvider,
    private helper: HelperProvider) {
  }

  async ionViewDidLoad() {
    this.loadingService.showLoading();

    // 创建pid
    if (!this.storageService.read('jdPid')) {
      await this.pidGenerate();
    }

    this.role = this.storageService.read('roleNumber');

    this.getData();

  }


  pidGenerate(): Promise<any> {
    return new Promise((resolve) => {
      this.httpService.get('/jd/pidGenerate').then((res: any) => {
        if (res && res.msg == 'OK') {
          this.storageService.write('jdPid', 'Y');
        }
        resolve(res);
      });
    });
  }

  /**
   * 获取爆款数据
   */
  getData(infiniteScroll?: any) {
    if (!infiniteScroll) {
      this.loadingService.showLoading();
    }
    this.httpService.post('/jd/getTopGoodsList', this.postParam).then((res: any) => {
      this.loadingService.hideLoading();
      if (res && res.msg == 'OK') {
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
        res.list.forEach(element => {
          if (element.wlCommission) {
            element.commission = (element.wlCommission * this.role).toFixed(2);
          } else {
            element.commission = 0;
          }
          element.couponPrice = 0;
          if(element.couponNote){
            let strs = element.couponNote.split("减");
            element.couponPrice = parseInt(strs[1]);
          }
 
          element.price = (Number(element.wlPrice) -Number(element.commission)) - element.couponPrice ;
          element.price  =(element.price ).toFixed(2);
        });

        if (res && res.list && res.list.length > 0) {
          this.topGoodsList = this.topGoodsList.concat(res.list);
        } else {
          this.ban = true;
        }

      }
    })
  }

  /**
   * 搜索事件
   */
  onSearch() {
    if (this.searchtext) {
      this.navCtrl.push('JdGoodsListPage', { value: this.searchtext });
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
    this.postParam.pageIndex += 1;

    this.getData(infiniteScroll);

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
    this.loadingService.showLoading();
    this.httpService.get('/jd/urlGenerate/'+item.skuId).then((res:any) => {
      this.loadingService.hideLoading();
      if(res && res.msg == 'OK'){
        this.helper.openUrlByBrowser(res.data.short_url);
      }
    })
  }


}
