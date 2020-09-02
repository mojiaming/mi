import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { HelperProvider } from '../../providers/helper/helper';

/**
 * Generated class for the NinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nine',
  templateUrl: 'nine.html',
})
export class NinePage {
  userInfo: any;
  segmentModel: string = '-1';
  zero = [];
  one = [];
  two = [];
  three = [];
  four = [];
  five = [];
  six = [];
  seven = [];
  eight = [];
  nine = [];
  ten = [];

  // 页码
  zeroPageId = 1;
  onePageId = 1;
  twoPageId = 1;
  threePageId = 1;
  fourPageId = 1;
  fivePageId = 1;
  sixPageId = 1;
  sevenPageId = 1;
  eightPageId = 1;
  ninePageId = 1;
  tenPageId = 1;
  role: number = 0.4;//分成


  zeroban = false;
  oneban = false;
  twoban = false;
  threeban = false;
  fourban = false;
  fiveban = false;
  sixban = false;
  sevenban = false;
  eightban = false;
  nineban = false;
  tenban = false;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private loadingService: LoadingServiceProvider,
    private storageService: StorageServiceProvider,
    private helper: HelperProvider,
    private events: Events) {
  }

  ionViewDidLoad() {
    this.userInfo = this.storageService.read("UserInfo");
    this.loadingService.showLoading();
    this.role = this.storageService.read('roleNumber');
    this.getData(this.onePageId, '-1');
    this.getData(this.onePageId, '1');
    this.getData(this.onePageId, '2');
    this.getData(this.onePageId, '3');
  }



  /**
   * 获取数据
   * @param pageId 
   * @param cid 
   */
  getData(pageId, cid, infiniteScroll?: any) {
    if (!infiniteScroll) {
      this.loadingService.showLoading();
    }
    this.httpService.get('/NineGoods.json').then((res: any) => {

      this.loadingService.hideLoading();
      res.list.forEach(element => {
        element['commission'] = (element.commissionRate / 100 * element.actualPrice * this.role).toFixed(2);
      });
      if (res && res.msg == 'OK') {
        switch (cid) {
          case '-1':
            if (res.list && res.list.length >= 10) {
              this.zero = this.zero.concat(res.list);
            } else {
              this.zeroban = true;
            }

            break;

          case '1':
            if (res.list && res.list.length >= 10) {
              this.one = this.one.concat(res.list);
            } else {
              this.oneban = true;
            }
            break;
          case '2':

            if (res.list && res.list.length >= 10) {
              this.two = this.two.concat(res.list);
            } else {
              this.twoban = true;
            }
            break;
          case '3':

            if (res.list && res.list.length >= 10) {
              this.three = this.three.concat(res.list);
            } else {
              this.threeban = true;
            }
            break;
          case '4':
            if (res.list && res.list.length >= 10) {
              this.four = this.four.concat(res.list);
            } else {
              this.fourban = true;
            }


            break;
          case '5':

            if (res.list && res.list.length >= 10) {
              this.five = this.five.concat(res.list);
            } else {
              this.fiveban = true;
            }

            break;
          case '6':

            if (res.list && res.list.length >= 10) {
              this.six = this.six.concat(res.list);;
            } else {
              this.sixban = true;
            }
            break;
          case '7':

            if (res.list && res.list.length >= 10) {
              this.seven = this.seven.concat(res.list);
            } else {
              this.sevenban = true;
            }
            break;
          case '8':

            if (res.list && res.list.length >= 10) {
              this.eight = this.eight.concat(res.list);
            } else {
              this.eightban = true;
            }
            break;
          case '9':
            if (res.list && res.list.length >= 10) {
              this.nine = this.nine.concat(res.list);
            } else {
              this.nineban = true;
            }

            break;
          case '10':

            if (res.list && res.list.length >= 10) {
              this.ten = this.ten.concat(res.list);
            } else {
              this.tenban = true;
            }
            break;
        }
      }
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
    })
  }

  /**
 * 上拉加载
 * @param infiniteScroll 
 */
  doInfiniteZero(infiniteScroll) {
    ++this.zeroPageId;
    this.getData(this.zeroPageId, '-1', infiniteScroll);
  }

  doInfiniteOne(infiniteScroll) {
    ++this.onePageId;
    this.getData(this.onePageId, '1', infiniteScroll);
  }

  doInfiniteTwo(infiniteScroll) {
    ++this.twoPageId;
    this.getData(this.twoPageId, '2', infiniteScroll);
  }


  doInfiniteThree(infiniteScroll) {
    ++this.threePageId;
    this.getData(this.threePageId, '3', infiniteScroll);
  }

  doInfiniteFour(infiniteScroll) {
    ++this.fourPageId;
    this.getData(this.fourPageId, '4', infiniteScroll);
  }

  doInfiniteFive(infiniteScroll) {
    ++this.fivePageId;
    this.getData(this.fivePageId, '5', infiniteScroll);
  }

  doInfiniteSix(infiniteScroll) {
    ++this.sixPageId;
    this.getData(this.sixPageId, '6', infiniteScroll);
  }

  doInfiniteSeven(infiniteScroll) {
    ++this.sevenPageId;
    this.getData(this.sevenPageId, '7', infiniteScroll);
  }

  doInfiniteEight(infiniteScroll) {
    ++this.eightPageId;
    this.getData(this.eightPageId, '8', infiniteScroll);
  }


  doInfiniteNine(infiniteScroll) {
    ++this.ninePageId;
    this.getData(this.ninePageId, '9', infiniteScroll);
  }

  doInfiniteTen(infiniteScroll) {
    ++this.tenPageId;
    this.getData(this.tenPageId, '10', infiniteScroll);
  }

  segmentChanged() {
    this.content.scrollToTop();
    switch (this.segmentModel) {
      case '4':
        if (this.four.length == 0) {
          this.getData(this.fourPageId, '4');
        }
        break;
      case '5':
        if (this.five.length == 0) {
          this.getData(this.fivePageId, '5');
        }
        break;
      case '6':
        if (this.six.length == 0) {
          this.getData(this.sixPageId, '6');
        }
        break;
      case '7':
        if (this.seven.length == 0) {
          this.getData(this.sevenPageId, '7');
        }
        break;
      case '8':
        if (this.eight.length == 0) {
          this.getData(this.eightPageId, '8');
        }
        break;
      case '9':
        if (this.nine.length == 0) {
          this.getData(this.ninePageId, '9');
        }
        break;
      case '10':
        if (this.ten.length == 0) {
          this.getData(this.tenPageId, '10');
        }
        break;
    }
  }

  /**
   * 商品点击事件
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
