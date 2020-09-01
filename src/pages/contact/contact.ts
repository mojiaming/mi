import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
import { TabsPage } from '../tabs/tabs';
import { HelperProvider } from '../../providers/helper/helper';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  userInfo:any;
  pages:Array<any> = [
    {
      "name": "我的订单", "child": [
        { "childName": "已付款", component: 'OrderPage', icon: "assets/imgs/fukuang.png", param: 'one' },
        { "childName": "待返现", component: 'OrderPage', icon: "assets/imgs/daifu.png", param: 'tow' },
        { "childName": "已返现", component: 'OrderPage', icon: "assets/imgs/fanli.png", param: 'three' },
        { "childName": "已失效", component: 'OrderPage', icon: "assets/imgs/shixiao.png", param: 'four' }
      ]
    },
    {
      "name": "我的工具", "child": [
        { "childName": "找回订单", component: 'FindOrderPage', icon: "assets/imgs/dingdan.png" },
        { "childName": "提现", component: 'WithdrawalPage', icon: "assets/imgs/tixian.png" },
        { "childName": "提现明细", component: 'WithdrawalDetailedPage', icon: "assets/imgs/zhichu.png" },
        { "childName": "收入明细", component: 'IncomeDetailedPage', icon: "assets/imgs/shouru.png" },
        { "childName": "邀请赚钱", component: 'MakeMoneyPage', icon: "assets/imgs/fenxiang.png" },
        { "childName": "我的团队", component: 'MyTeamPage', icon: "assets/imgs/tuandui.png" },
        { "childName": "代理申请", component: 'AgentApplyPage', icon: "assets/imgs/daili.png" },
        { "childName": "排行榜", component: 'RankingPage', icon: "assets/imgs/ranking.png" }
      ]
    },
    
    // {
    //   "name": "推广管理", "child": [
      
    //   ]
    // },
    {
      "name": "常用功能", "child": [
        { "childName": "授权", component: 'AuthHorizePage', icon: 'assets/imgs/authorize.png' },
        { "childName": "常见问题", component: 'ProblemPage', icon: 'assets/imgs/wenti.png' },
        { "childName": "专属客服", component: 'CustomerServicePage', icon: 'assets/imgs/kefuicon.png' }
      ]
    }
  ];
  
  constructor(public navCtrl: NavController,
  private storageService: StorageServiceProvider,
  private globalData: GlobalDataProvider,
  private events: Events,
  private helper: HelperProvider) {
    

    if(!this.globalData.token){
      this.navCtrl.setRoot(TabsPage, { value: 0 });
      this.events.publish('login:go');
    }

    this.events.subscribe('UserInfo',()=>{
      this.userInfo = this.storageService.read("UserInfo");
    })

    this.userInfo = this.storageService.read("UserInfo");
  }

  ionViewDidLoad() {
    if(this.helper.isWXBrowser()){
      this.pages[2].child.push({ "childName": "关联码", component: 'AssociatedCodePage', icon: 'assets/imgs/guanlian.png' });
    }
    if(!this.helper.isMobile()){
      this.pages[2].child.push({ "childName": "APP下载", component: 'AppDownloadPage', icon: 'assets/imgs/app_download.png' });
    }
  }

  /**
   * 
   * @param item 跳转页面
   */
  openPage(item) {
    if (item.param) {
      this.navCtrl.push(item.component, { value: item.param });
    } else {
      this.navCtrl.push(item.component);
    }

  }

  /**
   * 设置事件
   */
  onSet(){
    this.navCtrl.push('SettingsPage');
  }


  ionViewWillEnter(){
    // this.statusBar.backgroundColorByHexString("#f53d3d");
  }

  // ionViewWillLeave(){
  //   this.statusBar.overlaysWebView(true);
  //   this.statusBar.backgroundColorByName('white');
  // }
}
