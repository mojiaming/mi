import { ToastServiceProvider } from './../providers/toast-service/toast-service';
import { AppVersion } from '@ionic-native/app-version';
import { Clipboard } from '@ionic-native/clipboard';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events, PopoverController, App, IonicApp, Keyboard } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { HttpServiceProvider } from '../providers/http-service/http-service';
import { LoadingServiceProvider } from '../providers/loading-service/loading-service';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { GlobalDataProvider } from '../providers/global-data/global-data';
import { AlertServiceProvider } from '../providers/alert-service/alert-service';
import { HelperProvider } from '../providers/helper/helper';
import { TaobaoServiceProvider } from '../providers/taobao-service/taobao-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  @ViewChild("nav") nav: Nav;
  userInfo: any;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen,
    private httpService: HttpServiceProvider,
    private loading: LoadingServiceProvider,
    private storageService: StorageServiceProvider,
    private globalData: GlobalDataProvider,
    private alertService: AlertServiceProvider,
    private helper: HelperProvider,
    private events: Events,
    private clipboard: Clipboard,
    private popoverCtrl: PopoverController,
    private keyboard: Keyboard,
    private ionicApp: IonicApp,
    private app: App,
    private appVersion: AppVersion,
    private toastService: ToastServiceProvider,
    private taobaoService: TaobaoServiceProvider) {
    this.initializeApp();

  }

  async initializeApp() {
    this.events.subscribe('login:go', () => {
      this.nav.setRoot('LoginPage');
    });
    this.events.subscribe('user:login', () => {
      this.login();
    })
    this.platform.ready().then(() => {
      this.userInfo = this.storageService.read('UserInfo');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // this.nav.setRoot(TabsPage, { value: 0 });
      // alert(new Date());

      // alert('start')
      // 监听程序从后台切换到前台
      document.addEventListener("resume", () => {

        this.getClipboard();

      }, false)

      if (this.helper.isWXBrowser()) {
        let param = this.GetRequest();
        if ((param && param['?token']) || this.storageService.read('token')) {
          this.loading.showLoading('登录验证中...');
          this.loginPlugin(param['?token'] ? param['?token'] : this.storageService.read('token')).then(res => {

            this.loading.hideLoading();
            if (res['msg'] == "OK" && res['data']) {
              this.storageService.write('UserInfo', res['data']);
              this.storageService.write('login:type', 'public');
              this.globalData.username = res['data'].nickname;
              this.globalData.token = res['data'].token;
              this.storageService.write('token', this.globalData.token);
              if (param['page'] == 'order') {
                this.nav.setRoot("OrderPage");
              } else if (param['page'] == 'income') {
                this.nav.setRoot("IncomeDetailedPage");
              } else if (param['page'] == 'myteam') {
                this.nav.setRoot("MyTeamPage");
              } else if (param['page'] == 'tixian') {
                this.nav.setRoot("WithdrawalPage");
              } else if (param['page'] == 'daili') {
                this.nav.setRoot("AgentApplyPage");
              } else if (param['page'] == 'ranking') {
                this.nav.setRoot("RankingPage");
              } else if (param['page'] == 'contact') {
                this.nav.setRoot(TabsPage, { value: 2 });
              } else if (param['page'] == 'home') {//默认首页
                this.nav.setRoot(TabsPage, { value: 0 });
              } else {
                //默认首页
                this.nav.setRoot(TabsPage, { value: 0 });
              }

            } else {
              this.alertService.showAlert("获取用户信息失败，请重新打开页面登录");
            }
          });
        } else {
          this.authToken();
          this.nav.setRoot(TabsPage, { value: 0 });
        }

      } else {
        this.authToken();
        this.nav.setRoot(TabsPage, { value: 0 });
      }
      this.getClipboard();
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.statusBar.backgroundColorByName('white');
      if (this.helper.isMobile()) {
        // 初始化淘宝sdk
        this.taobaoService.init();

        this.checkApp();

        //启动热更新
        // this.helper.sync();
        this.registerBackButtonAction();//注册返回按键事件
      }
    });
  }


  /**
   * android 物理返回键处理
   */
  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      if (this.keyboard.isOpen()) {//如果键盘开启则隐藏键盘
        this.keyboard.close();
        return;
      }

      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()
      let activePortal = this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss().catch(() => { });
        activePortal.onDidDismiss(() => { });
        return;
      }
      let loadingPortal = this.ionicApp._loadingPortal.getActive();
      if (loadingPortal) {
        loadingPortal.dismiss().catch(() => { });
        return;
      }

      if (this.app.getActiveNav().canGoBack() || this.nav.canGoBack()) {
        this.app.navPop();
      } else {
        this.showExit();
      }
      return;
    }, 100);
  }

  //双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastService.showToast('再次返回退出程序');
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }



  /**
   * 检查更新APP
   */
  checkApp() {
    this.httpService.post('/app/select', { name: 'com.work.mitao' }).then((res: any) => {
      if (res && res.msg == 'OK') {
        this.appVersion.getVersionNumber().then(version => {
          if (version != res.data.version) {
            this.helper.downloadApp();
          }
        })

      }
    })
  }


  /**
   * 检验token
   */
  authToken() {
    // 判断是否已经登录过
    let token: string = this.storageService.read('token');
    if (token) {
      this.loading.showLoading();
      this.httpService.get('/user/tokenAuth').then((res: any) => {
        if (res && res.msg == 'OK') {
          this.loading.hideLoading();
          this.globalData.token = token;
          this.loginSucceed(null);
        } else {
          this.login();
        }
      })

    }
  }

  /**
   * 重新登录
   */
  login() {
    if (this.storageService.read('login:type') == 'phone') {//如果是邮箱登录
      this.httpService.post('/user/loginMail', { username: this.userInfo.username, password: this.userInfo.password }).then((res: any) => {
        this.loginSucceed(res);
      })
    } else if (this.storageService.read('login:type') == 'id') {//如果是关联公众号登录
      this.httpService.post('/user/loginPass', { password: this.userInfo.password }).then((res: any) => {
        this.loginSucceed(res);
      })
    } else if (this.storageService.read('login:type') == 'wechat') {//如果是微信登录授权
      this.httpService.post('/user/loginWechat', { openid: this.userInfo.openid }).then((res: any) => {
        this.loginSucceed(res);
      })
    }
  }


  /**
   * 登录成功处理
   * @param res 
   */
  loginSucceed(res: any) {
    this.loading.hideLoading();
    if (res && res.msg == 'OK') {
      this.globalData.token = res.data.token;
      this.storageService.write('token', this.globalData.token);
      // this.storageService.write("UserInfo", res.data);
    }



  }
  /**
   * 验证
   * @param param 
   */
  loginPlugin(param: string) {
    //根据用户token获取用户信息
    return this.httpService.post('/user/wxLogin', { token: param });
  }

  // 查看剪切板
  getClipboard() {
    if (this.helper.isMobile())
      this.clipboard.paste().then(
        (resolve: string) => {
          if (resolve && this.storageService.read('clipboard') != resolve) {
            this.storageService.write("clipboard", resolve);
            if (resolve.indexOf('yangkeduo.com') != -1 || resolve.indexOf('jd.com') != -1 || resolve.indexOf('tb.cn') != -1 || resolve.indexOf('tmall.com') != -1) {
              let modal = this.popoverCtrl.create('SearchGoodsPage', { value: resolve }, { cssClass: 'share-goods' });
              modal.present();
            }
          }
        }
      );

  }


  /**
   * 获取url参数
   */
  GetRequest() {
    let url = location.hash; //获取url中"?"符后的字串 
    let theRequest = new Object();
    if (url.indexOf("?") != -1) {
      let str = url.substr(1);
      let strs = str.split("&");
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
      }

    }
    if (theRequest['?token']) {
      window.location.hash = location.hash.replace('?token=' + theRequest['?token'] + '&page=' + theRequest['page'], '');
    }

    return theRequest;
  }

}
