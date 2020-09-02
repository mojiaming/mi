import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Events, Content, Platform } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { HelperProvider } from '../../providers/helper/helper';
import { Storage } from '@ionic/storage';
import { ThemeableServiceProvider } from '../../providers/themeable-service/themeable-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('slides') slides: Slides;
  @ViewChild('slides2') slides2: Slides;
  @ViewChild('slides3') slides3: Slides;
  special1 = [];//特价1
  special2 = [];//特价2
  special3 = [];//特价3
  special4 = [];//特价4
  page: number = 1;//开始数量
  pagesize: number = 20;//商品数量
  data = [];//商品列表
  ban = false;
  userInfo: any;
  navigator: any = navigator;
  showAuthorize = false;

  segmentModel: string = '1';
  @ViewChild(Content) content: Content;
  Categoryhosts = [
    { cid: '1', cname: "推荐", data: [], pageId: 1, ban: false, sort: 'tk_total_sales_des', selectFlag: 0, priceIcon: 'arrow-round-down' },
    { cid: '35,122650005,50008165,50022517', cname: "母婴", data: [], pageId: 1, ban: false, sort: 'tk_total_sales_des', selectFlag: 0, priceIcon: 'arrow-round-down' },
    { cid: '50002766,35,50008075', cname: "食品", data: [], pageId: 1, ban: false, sort: 'tk_total_sales_des', selectFlag: 0, priceIcon: 'arrow-round-down' },
    { cid: '16', cname: "女装", data: [], pageId: 1, ban: false, sort: 'tk_total_sales_des', selectFlag: 0, priceIcon: 'arrow-round-down' },
    { cid: '50010788', cname: "彩妆", data: [], pageId: 1, ban: false, sort: 'tk_total_sales_des', selectFlag: 0, priceIcon: 'arrow-round-down' },
    { cid: '50014812,50025705', cname: "洗护", data: [], pageId: 1, ban: false, sort: 'tk_total_sales_des', selectFlag: 0, priceIcon: 'arrow-round-down' },
    { cid: '1625', cname: "内衣", data: [], pageId: 1, ban: false, sort: 'tk_total_sales_des', selectFlag: 0, priceIcon: 'arrow-round-down' },
    { cid: '21,50016348,50007218,50007218,26', cname: "百货", data: [], pageId: 1, ban: false, sort: 'tk_total_sales_des', selectFlag: 0, priceIcon: 'arrow-round-down' },
    { cid: '50022703,50011972,50012100,50012082', cname: "家电", data: [], pageId: 1, ban: false, sort: 'tk_total_sales_des', selectFlag: 0, priceIcon: 'arrow-round-down' },
    { cid: '50020808,50008164,50016348,21,122852001', cname: "家居", data: [], pageId: 1, ban: false, sort: 'tk_total_sales_des', selectFlag: 0, priceIcon: 'arrow-round-down' },
    { cid: '14,50008090', cname: "数码", data: [], pageId: 1, ban: false, sort: 'tk_total_sales_des', selectFlag: 0, priceIcon: 'arrow-round-down' },
    { cid: '1801,50023282', cname: "护肤", data: [], pageId: 1, ban: false, sort: 'tk_total_sales_des', selectFlag: 0, priceIcon: 'arrow-round-down' },
    { cid: '30', cname: "男装", data: [], pageId: 1, ban: false, sort: 'tk_total_sales_des', selectFlag: 0, priceIcon: 'arrow-round-down' },
    { cid: '50013886,50510002,50010728,50011699,50012029', cname: "运动", data: [], pageId: 1, ban: false, sort: 'tk_total_sales_des', selectFlag: 0, priceIcon: 'arrow-round-down' },
    { cid: '50013864,50010404', cname: "配饰", data: [], pageId: 1, ban: false, sort: 'tk_total_sales_des', selectFlag: 0, priceIcon: 'arrow-round-down' }
  ];

  postParam = {
    para: null,
    page: 1,
    pagesize: 20,
    sort: 'tk_total_sales_des',
    cat: null
  }

  role: number = 0.4;//分成
  isWXBrowser: boolean = false;
  isInitialize: boolean = false;//是否第一次

  imgList: Array<any> = [];//轮播图

  style = {};//栏目图片动态比例宽度  
  style2 = {};
  hours: number;//当前小时
  dayTime: string;//抢购日期
  param = {
    page: 1,
    pagesize: 10,
    startTime: '',
    endTime: ''
  }
  grabTime: any;//倒计时定时器
  countdown: string;//倒计时
  timeData: Array<any> = [];
  selectData: any;
  index: number;//抢购索引
  constructor(public navCtrl: NavController,
    private httpService: HttpServiceProvider,
    private storageService: StorageServiceProvider,
    private helper: HelperProvider,
    private storage: Storage,
    private events: Events,
    private themeableService: ThemeableServiceProvider,
    private platform: Platform) {


    // 缓存数据

    this.storage.get('home:imgList').then(res => {
      if (res && this.imgList.length == 0) {
        this.imgList = res;
      }
    })
    // this.storage.get('specials').then(res => {
    //   if (res && res.length == 12 && this.special1.length == 0) {
    //     this.special1 = res.slice(0, 3);
    //     this.special2 = res.slice(3, 6);
    //     this.special3 = res.slice(6, 9);
    //     this.special4 = res.slice(9, 12);
    //   }
    // })
    this.storage.get('productsHome').then(res => {
      if (res && this.data.length == 0) {
        this.data = res;
      }
    })
  }

  async ionViewDidLoad() {
    this.hours = new Date().getHours();
    this.dayTime = this.helper.getDate();



    this.style = {
      height: this.platform.height() / 6 + 'px'
    }
    this.style2 = {
      height: this.platform.height() / 3 - (26 + 24) + 'px'
    }
    // 获取轮播图数据
    this.httpService.get('/homeImgs.json').then((res: any) => {
      if (res && res.msg == 'OK') {
        this.imgList = res.list;
        this.storage.set('home:imgList', this.imgList);
      }
    })

    await this.getJuTqgTime();
    let itemIndex = 0;//时间段的索引
    for (let i = 0; i < this.timeData.length; i++) {
      if (this.hours >= this.timeData[i].minTime && this.hours < this.timeData[i].maxTime) {
        this.hours = this.timeData[i].minTime;
        this.selectData = this.timeData[i];
        this.index = i;
        this.timeData[i].active = true;
      } else if(this.hours >= this.timeData[i].minTime){
        itemIndex = i;
      } else {
        this.timeData[i].active = false;
      }
    }

    if(!this.selectData){
      this.selectData = this.timeData[itemIndex];
      this.index = itemIndex;
      this.timeData[itemIndex].active = true;
    }
    this.grabTime = setInterval(() => {
      //  当当前小时时间大于之前时间时，重新获取数据
      let hours = new Date().getHours();
      let oldHours = this.hours;
      // this.selectData = null;
      if (hours > this.hours) {
        for (let i = 0; i < this.timeData.length; i++) {
          if (hours >= this.timeData[i].minTime && hours < this.timeData[i].maxTime) {
            this.hours = this.timeData[i].minTime;
            this.selectData = this.timeData[i];
            this.index = i;
         
          } else if(this.hours >= this.timeData[i].minTime){
            itemIndex = i;
          }
        }
      }
      if(!this.selectData){
        this.selectData = this.timeData[itemIndex];
        this.index = itemIndex;
        this.timeData[itemIndex].active = true;
      }

      if (this.hours != oldHours) {
        this.getJuTqg();
      }
      let time = '';
      if (this.timeData.length > (this.index+1)) {
        time = this.timeData[this.index+1].minTime > 10 ?  this.timeData[this.index+1].minTime : '0' + this.timeData[this.index+1].minTime
      } else if( hours > this.selectData.maxTime ){
        time = '24';
      } else {
        time = this.selectData.maxTime > 10 ? this.selectData.maxTime : '0' + this.selectData.maxTime;
      }
      this.countdown = this.helper.getCountDown(new Date(this.dayTime + ' ' + time + ':00:00').getTime());
    }, 1000);
    // this.helper.getCountDown(new Date('2019-06-09 08:00:00').getTime());
    this.isWXBrowser = this.helper.isWXBrowser();
    if (!this.helper.isMobile() && this.storageService.read('Initialize') != 'Y') {
      this.isInitialize = true;
      this.storageService.write('Initialize', 'Y');
    }
    this.getRole();
    this.userInfo = this.storageService.read("UserInfo");
    // 检查是否以渠道授权
    if (this.userInfo && !this.userInfo.relation_id) {
      this.showAuthorize = true;
    }


    // 获取抢购数据
    this.getJuTqg();

    this.getGoods();


  }


  /**
  * 获取抢购时间段
  */
  getJuTqgTime(): Promise<any> {
    return new Promise((resolve) => {
      this.httpService.get('/juTqgTime.json').then((res: any) => {
        if (res && res.msg == "OK" && res.data) {
          this.timeData = [];
          res.data.list.forEach(element => {
            if (typeof element == 'string') {
              element = JSON.parse(element)
            }
            this.timeData.push(element);
          });
        }
        this.storageService.write('timeData', this.timeData);
        resolve();
      })
    });
  }

  /**
   * 获取定时抢购商品
   */
  async getJuTqg() {

    await this.getJuTqgTime();

    let sT = this.selectData.minTime < 10 ? '0' + this.selectData.minTime : this.selectData.minTime;
    this.param.startTime = this.dayTime + ' ' + sT + ':00:00';
    this.param.endTime = this.dayTime + ' ' + sT + ':01:00';
    this.httpService.get('/juTqg.json').then((res: any) => {
      if (res && res.msg == 'OK') {
        let data = JSON.parse(res.data);
        if (data.tbk_ju_tqg_get_response && data.tbk_ju_tqg_get_response.results && data.tbk_ju_tqg_get_response.results.results) {
          if (!this.helper.isWXBrowser() && !this.helper.isMobile()) {
            data.tbk_ju_tqg_get_response.results.results.forEach(element => {
              element.pic_url = element.pic_url.replace('http://img4.tbcdn.cn/tfscom/', 'https:')
            });
          }

          this.special1 = data.tbk_ju_tqg_get_response.results.results;

        }
      }
    })

  }

  /**
   * 9.9精选事件
   */
  onNine() {
    this.navCtrl.push('NinePage');
  }

  /**
   * 天猫事件
   */
  onTianmao() {
    this.navCtrl.push('GoodsListPage', { value: '', tmall: 'Y' });
  }

  /**
   * 聚划算事件
   */
  onJuHuaSuan() {
    this.navCtrl.push('DtkGoodsListPage', { juhuasuan: 'Y' })
  }

  /**
   * 海淘事件
   */
  onHaiTao() {
    this.navCtrl.push('DtkGoodsListPage', { haitao: 'Y' })
  }

  /**
   * 拼多多事件
   */
  onPdd() {
    if (!this.helper.isLogin()) {
      this.events.publish('login:go');
      return;
    }
    this.navCtrl.push('PddGoodsPage');
  }

  /**
   * 转链事件
   */
  onzhuanlian() {
    this.navCtrl.push('TurnChainPage');
  }

  /**
   * 图片点击事件
   * @param item 
   */
  onImg(item) {
    if (item.type == 1) {
      if (!this.helper.isLogin()) {
        this.events.publish('login:go');
        return;
      }
      this.navCtrl.push('AgentApplyPage');
    } else if (item.type == 2) {
      if (this.helper.isMobile()) {
        this.themeableService.create(item.url);
      } else {
        this.helper.openUrlByBrowser(item.url);
      }
    }
  }

  /**
   * 代理图片点击事件
   */
  // onDaili() {
  //   if (!this.helper.isLogin()) {
  //     this.events.publish('login:go');
  //     return;
  //   }
  //   this.navCtrl.push('AgentApplyPage');
  // }

  // /**
  //  * 招募图片点击事件
  //  */
  // onZhaomu() {

  //   // this.navCtrl.push('OpenUrlPage',{value:'https://mp.weixin.qq.com/s/GZQAwkj0VPP1ZvJMipOTfA',title: '蜜淘平台'})
  //   if(this.helper.isMobile()){
  //     this.themeableService.create('https://mp.weixin.qq.com/s/GZQAwkj0VPP1ZvJMipOTfA');
  //   } else {
  //     this.helper.openUrlByBrowser('https://mp.weixin.qq.com/s/GZQAwkj0VPP1ZvJMipOTfA');
  //   }

  // }

  // /**
  //  * 使用教程事件
  //  */
  // onJiaoCheng(){
  //   if(this.helper.isMobile()){
  //     this.themeableService.create('https://mp.weixin.qq.com/s/7Ep4fbrvRezy8irnrxQRzw');
  //   } else {
  //     this.helper.openUrlByBrowser('https://mp.weixin.qq.com/s/7Ep4fbrvRezy8irnrxQRzw');
  //   }
  // }


  /**
   * 京东事件 
   */
  onJingDong() {
    if (!this.helper.isLogin()) {
      this.events.publish('login:go');
      return;
    }
    this.navCtrl.push('JdGoodsPage');
  }

  /**
   * 教程点击事件
   * @param num 
   */
  onJiao(num) {
    switch (num) {
      case 2:
        this.helper.openUrlByBrowser('https://mp.weixin.qq.com/s/9E_xVLyfOqOfZdC0x76CJg');
        break;
      case 3:
        this.helper.openUrlByBrowser('https://mp.weixin.qq.com/s/9E_xVLyfOqOfZdC0x76CJg');
        break;
      default:
        this.helper.openUrlByBrowser('https://mp.weixin.qq.com/s/9E_xVLyfOqOfZdC0x76CJg');
        break;
    }
  }

  /**
   * 获取分成
   */
  getRole() {
    this.httpService.get('/role.json').then(res => {
      if (res && res['msg'] == 'OK' && res['data'].length > 0) {
        this.role = res['data'][0].divided / 10;
        this.storageService.write('roleNumber', this.role);
      }
    })
  }

  /**
   * 获取商品
   */
  getGoods(infiniteScroll?: any) {
    this.httpService.get('/products.json').then(res => {
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
      if (res && res['data']) {
        res['data'].forEach(element => {//计算最终价格
          element['amount'] = (element.zk_final_price - element.coupon_amount).toFixed(2);
        });
        if (this.page == 1) {
          this.storage.set('productsHome', res['data']);
        }
        this.data = this.data.concat(res['data']);
      } else {
        this.ban = true;
      }

    })
  }

  //页面进入时启动自动播放
  ionViewDidEnter() {
    // 去除懒加载url
    //  window.location.hash = location.hash.replace(location.hash, '');

    if (this.slides) {
      this.slides.startAutoplay();
    }
    if (this.slides2) {
      this.slides2.startAutoplay();
    }
    if (this.slides3) {
      this.slides3.startAutoplay();
    }
  }


  //页面离开时停止自动播放


  ionViewDidLeave() {
    if (this.slides) {
      this.slides.stopAutoplay();
    }

    if (this.slides2) {
      this.slides2.stopAutoplay();
    }
    if (this.slides3) {
      this.slides3.stopAutoplay();
    }
  }

  /**
  * 
  * @param infiniteScroll 上拉加载
  */
  doInfinite(infiniteScroll) {
    if (!this.ban) {
      this.page += 1;
      this.getGoods(infiniteScroll);
    }
  }

  /**
   * 菜单切换事件
   */
  segmentChanged() {
    this.content.scrollToTop();
    for (let i = 0; i < this.Categoryhosts.length; i++) {
      if (this.segmentModel != '1') {
        if (this.Categoryhosts[i].cid == this.segmentModel && this.Categoryhosts[i].data.length == 0) {
          this.getData2(i)
        }
      }

    }

  }

  /**
  * 上拉加载
  * @param event 
  * @param index 
  */
  doInfinite2(event, index) {
    ++this.Categoryhosts[index].pageId;
    this.getData2(index, event);
  }

  /**
  * 获取数据
  */
  getData2(index, infiniteScroll?: any) {
    // if (!infiniteScroll) {
    //   this.loadingService.showLoading();
    // }

    this.postParam.cat = this.Categoryhosts[index].cid;
    this.postParam.page = this.Categoryhosts[index].pageId;
    this.postParam.sort = this.Categoryhosts[index].sort;
    this.httpService.get('/goods.json').then((res: any) => {
      // this.loadingService.hideLoading();
      if (res && res.error == '0' && res.result_list) {
        res.result_list.forEach(element => {
          element['commission'] = (element.commission_rate / 10000 * element.zk_final_price * this.role).toFixed(2);
          if (element.coupon_info) {
            let strs = element.coupon_info.split("减");
            element.couponPrice = parseInt(strs[1]);
            element.zk_final_price = (element.zk_final_price - parseInt(strs[1])).toFixed(2);
          }
        })
        this.Categoryhosts[index].data = this.Categoryhosts[index].data.concat(res.result_list);
      }
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
      if (!res.result_list) {
        this.Categoryhosts[index].ban = true;
      }
    })
  }



  /**
   * 搜索事件 
   */
  onSearch() {
    if (!this.helper.isLogin()) {
      this.events.publish('login:go');
      return;
    }
    this.navCtrl.push('SearchPage');
  }

  /**
   * 分类点击事件
   */
  onClass(name: string) {
    this.navCtrl.push('GoodsListPage', { value: name });
  }

  /**
   * 商品点击事件
   */
  onItem(item) {
    if (!this.helper.isLogin()) {
      this.events.publish('login:go');
      return;
    }
    this.navCtrl.push('GoodsDetailedPage', { goods: item.num_iid });
  }

  /**
   * 商品点击事件
   * @param item 
   */
  onGoods(item: any) {
    if (!this.helper.isLogin()) {
      this.events.publish('login:go');
      return;
    }
    // 检查是否以渠道授权
    // if (!this.userInfo.relation_id && !this.userInfo.userInfo.tb_user_id) {
    //   this.alertService.showConfirm('是否立即授权?', '检测到你的账号还没有进行与淘宝授权，为了更好体验功能，请尽快授权。', '稍后提示', '立即授权').then(() => {
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


  /**
   * 授权事件
   */
  onAuthorize() {
    this.navCtrl.push('AuthHorizePage');
  }


  /**
   * 排序切换
   * @param num 
   */
  filter(index: number, num: number) {

    if (num == this.Categoryhosts[index].selectFlag && num == 3) {
      this.Categoryhosts[index].priceIcon = this.Categoryhosts[index].priceIcon == 'arrow-round-down' ? 'arrow-round-up' : 'arrow-round-down';
      this.Categoryhosts[index].data = [];
      this.Categoryhosts[index].pageId = 1;
      if (this.Categoryhosts[index].priceIcon == 'arrow-round-down') {
        this.Categoryhosts[index].sort = 'price_des';
      } else {
        this.Categoryhosts[index].sort = 'price_asc';
      }
      this.getData2(index);
    } else if (num != this.Categoryhosts[index].selectFlag) {
      this.Categoryhosts[index].selectFlag = num;
      this.Categoryhosts[index].data = [];
      this.Categoryhosts[index].pageId = 1;
      switch (num) {
        case 0:
          this.Categoryhosts[index].sort = 'tk_total_sales_des';
          break;
        case 1:
          this.Categoryhosts[index].sort = 'total_sales_des';
          break;
        case 2:
          this.Categoryhosts[index].sort = 'tk_rate_des';
          break;
        case 3:
          this.Categoryhosts[index].sort = 'price_des';
          break;
      }
      this.getData2(index);
    }
  }

  /**
   * 下载APP事件
   */
  onApp() {
    this.navCtrl.push('AppDownloadPage');
  }


  /**
   * 栏目点击事件
   * @param num 
   */
  onColumn(num: number) {
    switch (num) {
      case 1:
        // 抢购
        this.navCtrl.push('SnapUpGoodsPage');
        break;

      case 2:
        // 热销
        this.navCtrl.push('HotGoodsPage');
        break;
      case 3:
        // 特价
        this.navCtrl.push('SpecialGoodsPage');
        break;
    }
  }

  ionViewWillUnload() {
    // 页面销毁前同时销毁定时器
    if (this.grabTime) {
      clearInterval(this.grabTime);
      this.grabTime = null;
    }
  }
}
