import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { HelperProvider } from './../../providers/helper/helper';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content, Platform } from 'ionic-angular';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';

/**
 * Generated class for the SnapUpGoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-snap-up-goods',
  templateUrl: 'snap-up-goods.html',
})
export class SnapUpGoodsPage {
  @ViewChild(Content) content: Content;
  @ViewChild('slides') slides: any;
  hours: number = 0;//当前小时
  index: number = -1;//当前时间索引
  goodsList: Array<any> = [];
  isGrad: boolean = false;//是否可以抢购
  param = {
    page: 1,
    pagesize: 20,
    startTime: '',
    endTime: ''
  }
  dayTime: string = '';
  ban: boolean = false;

  data: Array<any> = [];
  isGoods: boolean = false;//是否显示无商品提示
  grabTime: any;//倒计时定时器
  // data: Array<any> = [{ period: '00:00', active: false, type: 1, minTime: 0, maxTime: 8 },
  // { period: '08:00', active: false, type: 1, minTime: 8, maxTime: 10 },
  // { period: '10:00', active: false, type: 1, minTime: 10, maxTime: 12 },
  // { period: '12:00', active: false, type: 1, minTime: 12, maxTime: 15 },
  // { period: '15:00', active: false, type: 1, minTime: 15, maxTime: 20 },
  // { period: '20:00', active: false, type: 1, minTime: 20, maxTime: 24 }];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private helper: HelperProvider,
    private loadingService: LoadingServiceProvider,
    private httpService: HttpServiceProvider,
    private events: Events,
    private el: ElementRef,
    private toastService: ToastServiceProvider,
    private platform: Platform,
    private storageService: StorageServiceProvider) {
  }

  ionViewDidLoad() {
    this.data = this.storageService.read('timeData');
    this.getTime();

    this.grabTime = setInterval(() => {
      this.getTime('t');
    }, 10000);
    this.getData();
  }


  getTime(t?) {
    this.hours = new Date().getHours();
    this.dayTime = this.helper.getDate();
    let itemIndex = 0;
    this.index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.hours >= this.data[i].minTime && this.hours < this.data[i].maxTime) {

        this.index = i;
        itemIndex = i;
        if (!t) {
          this.data[i].active = true;
        }

        this.data[i].type = 2;
        this.data[i].isGrad = true;
        if (this.data[i].active) {
          this.isGrad = true;
        }

      } else if (this.hours >= this.data[i].minTime) {
        this.data[i].isGrad = true;
        this.data[i].type = 1;
        itemIndex = i;
      }



      if (i > itemIndex) {
        this.data[i].type = 3;
        this.data[i].isGrad = false;
      } else if (i < itemIndex) {
        this.data[i].type = 1;
        this.data[i].isGrad = true;
      }


    }

    if (this.index == -1) {
      this.index = itemIndex;
      if (!t) {
        this.data[itemIndex].active = true;
        this.isGrad = true;
      }
    }


    if (!t) {
      setTimeout(() => {
        this.slides.nativeElement.scrollLeft = this.el.nativeElement.querySelector('.div-active').offsetLeft - (this.platform.width() / 2 - 85 / 2);
      }, 100)
    }
  }

  /**
   * 获取数据
   */
  getData(infiniteScroll?) {
    if (!infiniteScroll) {
      this.loadingService.showLoading();
    }

    this.data.forEach(element => {
      if (element.active) {
        this.isGrad = element.isGrad;
        let sT = element.minTime < 10 ? '0' + element.minTime : element.minTime;
        this.param.startTime = this.dayTime + ' ' + sT + ':00:00';
        this.param.endTime = this.dayTime + ' ' + sT + ':01:00';
        // if (element.endTime) {
        //   let eT = element.maxTime < 10 ? '0' + element.maxTime : element.maxTime;
        //   this.param.endTime = this.dayTime + ' ' + eT + ':00:00';
        // } else {
        //   this.param.endTime = this.helper.getDate(1) + ' 00:00:00';
        // }

      }
    })
    this.httpService.post('/taobao/getJuTqg', this.param).then((res: any) => {
      if (infiniteScroll) {
        infiniteScroll.complete();
      } else {
        this.loadingService.hideLoading();
      }

      if (res && res.msg == 'OK') {
        let data = JSON.parse(res.data);

        if (data.tbk_ju_tqg_get_response && data.tbk_ju_tqg_get_response.results && data.tbk_ju_tqg_get_response.results.results) {
          if (!this.helper.isWXBrowser() && !this.helper.isMobile()) {
            data.tbk_ju_tqg_get_response.results.results.forEach(element => {
              element.pic_url = element.pic_url.replace('http://img4.tbcdn.cn/tfscom/', 'https:')
            });
          }
          this.goodsList = this.goodsList.concat(data.tbk_ju_tqg_get_response.results.results)
        }
        if (data.tbk_ju_tqg_get_response && data.tbk_ju_tqg_get_response.results && data.tbk_ju_tqg_get_response.results.results) {
          if (data.tbk_ju_tqg_get_response.results.results.length < this.param.pagesize) {
            this.ban = true;
          } else {
            this.ban = false;
          }

        }
      }


    })
  }

  /**
   * 时间段点击事件
   * @param item 
   */
  onPeriod(item, i) {
    // this.index = i;

    for (let index = 0; index < this.data.length; index++) {
      this.data[index].active = false;
    }
    // this.data[i].active = true;
    item.isGrad = item.type != 3 ? true : false;
    this.isGrad = item.isGrad;
    if (!item.active) {
      item.active = true;
      this.param.page = 1;
      this.goodsList = [];
      this.getData();
    }


    setTimeout(() => {
      this.slides.nativeElement.scrollLeft = this.el.nativeElement.querySelector('.div-active').offsetLeft - (this.platform.width() / 2 - 85 / 2);
    }, 50)
    // if (this.index >= 3) {

    // } else {
    //   this.slides.nativeElement.scrollLeft = 0;
    // }
  }

  /**
   * 
   * @param infiniteScroll 上拉加载
   */
  doInfinite(infiniteScroll) {
    this.param.page++;
    this.getData(infiniteScroll);
  }

  /**
   * 商品点击事件
   * @param item 
   */
  onGoods(item: any) {
    if (this.isGrad) {
      if (!this.helper.isLogin()) {
        this.events.publish('login:go');
        return;
      }
      this.navCtrl.push('GoodsDetailedPage', { goods: item.num_iid });
    } else {
      this.toastService.showToast('亲，商品还没开始喔');
    }

  }

  /**
   * 滚动回顶部
   */
  scrollToTop() {
    this.content.scrollToTop();
  }

  ionViewWillUnload() {
    // 页面销毁前同时销毁定时器
    if (this.grabTime) {
      clearInterval(this.grabTime);
      this.grabTime = null;
    }
  }
}
