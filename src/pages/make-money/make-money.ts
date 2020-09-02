import { ClipboardService } from 'ngx-clipboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { HelperProvider } from '../../providers/helper/helper';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CameraServiceProvider } from '../../providers/camera-service/camera-service';
declare var Wechat: any;

/**
 * Generated class for the MakeMoneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-make-money',
  templateUrl: 'make-money.html',
})
export class MakeMoneyPage {
  url:string;
  isWXBrowser: boolean = false;//判断是否微信浏览器
  data: any;
  shareData = {
    message: '', // 内容
    subject: '邀请您注册', // 主题
    files: [],
    url: 'http://suo.im/69aUoR'
  }
  isMobile: boolean = false;//是否真机
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private globalData: GlobalDataProvider,
    private loadingService: LoadingServiceProvider,
    private clipboardServeice: ClipboardService,
    private helper: HelperProvider,
    private socialSharing: SocialSharing,
    private toastService: ToastServiceProvider,
    private cameraService: CameraServiceProvider) {
  }

  ionViewDidLoad() {
    this.isWXBrowser = this.helper.isWXBrowser();
    this.isMobile = this.helper.isMobile();

  }

  /**
   * 复制注册链接事件
   */
  onCopy() {
    let iscopy = this.clipboardServeice.copyFromContent('您的好友' + this.data.nickname + '邀请您使用蜜淘平台，购物先领劵，还能有佣金！----注册链接：' + this.shareData.url + '，邀请码：' + this.data.code);
    if (iscopy) {
      this.toastService.showToast('复制成功!');

    } else {
      this.toastService.showToast('复制失败，请手动复制!');
    }
  }

  /**
   * 系统分享
   */
  onShareImg() {
    this.shareData.files =[];
    this.shareData.message = '您的好友' + this.data.nickname + '邀请您使用蜜淘平台，购物先领劵，还能有佣金！';
    this.shareData.files.push(this.shareData.url);
    this.socialSharing.shareWithOptions(this.shareData)
  }

  /**
   * 下载事件
   */
  onDownload() {
    this.cameraService.download(this.url,new Date().getTime()+'.png').then((res)=>{
      this.toastService.showToast('下载成功');
    }).catch(err => {
      this.toastService.showToast('下载失败');
      alert(err)
    })
  }

  /**
   * 分享到微信好友
   */
  onWechat() {
    Wechat.share({
      text: '您的好友' + this.data.nickname + '邀请您使用蜜淘平台，购物先领劵，还能有佣金！',
      scene: Wechat.Scene.SESSION   // share to Timeline
    }, function () {
      alert("Success");
    }, function (reason) {
      alert("Failed: " + reason);
    });
  }

  /**
   * 分享到微信朋友圈
   */
  onFriend() {
    Wechat.share({
      message: {
        title: "邀请您使用蜜淘平台",
        description: "购物先领劵，还能有佣金！",
        thumb: this.url,
        mediaTagName: "",
        messageExt: "",
        messageAction: "",
        media: ""
    },
      // text: '您的好友' + this.data.nickname + '邀请您使用蜜淘平台，购物先领劵，还能有佣金！',
      scene: Wechat.Scene.TIMELINE   // share to Timeline
    }, function () {
      alert("Success");
    }, function (reason) {
      alert("Failed: " + reason);
    });
  }
}
