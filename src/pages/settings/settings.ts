import { HelperProvider } from './../../providers/helper/helper';
import { ConfigProvider } from './../../providers/config/config';
import { ToastServiceProvider } from './../../providers/toast-service/toast-service';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
import { CameraServiceProvider } from '../../providers/camera-service/camera-service';
import { FileUploader, FileItem } from 'ng2-file-upload';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  userInfo: any;//用户信息
  public uploader: FileUploader = null;
  isMobile: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storageService: StorageServiceProvider,
    private globalData: GlobalDataProvider,
    private events: Events,
    private httpService: HttpServiceProvider,
    private loadingService: LoadingServiceProvider,
    private toastService: ToastServiceProvider,
    private cameraService: CameraServiceProvider,
    private helper: HelperProvider) {
  }

  ionViewDidLoad() {
    this.userInfo = this.storageService.read('UserInfo');

    this.isMobile = this.helper.isMobile();

    this.uploader = new FileUploader({
      url: ConfigProvider.API_URL + "/user/uploadFile", //上传地址
      method: "POST",  //上传方式
      itemAlias: "file",  //别名（后台接受参数名）
      autoUpload: true, //是否自动上传（如果为true，则在input选择完后自动上传）
      authToken: this.storageService.read('token')
    });
    this.uploader.onSuccessItem = this.successItem.bind(this);
  }

  successItem(item: FileItem, response: string, status: number, headers: any): any {
    // 上传文件成功  
    if (status == 200) {
      // 上传文件后获取服务器返回的数据
      let tempRes = JSON.parse(response);
      if (tempRes && tempRes.msg == 'OK') {
        this.userInfo.headimgurl = tempRes.data;
        this.storageService.write('UserInfo', this.userInfo);
        // 广播通知更新
        this.events.publish('UserInfo');
      }
    } else {
      // 上传文件后获取服务器返回的数据错误  
      this.toastService.showToast('上图头像失败');
    }
  }

  /**
   * 退出登录
   */
  onLogOut() {
    this.storageService.remove('UserInfo');
    this.storageService.remove('token');
    this.globalData.token = null;
    this.globalData.username = null;
    this.globalData.userId = null;
    this.events.publish('login:go');
    this.httpService.get('/user/logOut');
  }

  /**
   * 头像选择事件
   */
  onImgChange() {

    this.uploader.queue.forEach((q: any, i) => {
      let $this = this;//区别于new FileReader()中的this
      let reader = new FileReader();
      reader.readAsDataURL(q.some);//生成base64图片地址，实现本地预览。只是same属性被protected修饰，需要修改。
      reader.onload = function () {
        $this.userInfo.headimgurl = this.result;
      }
    });
  }

  /**
   * 真机更换照片
   */
  onMobileImg(){
    this.cameraService.getPictureByPhotoLibrary().then(res => {

      this.cameraService.convertImgToBase64(res, (data) => {
        this.userInfo.headimgurl = "data:image/png;base64," + data;
      })

      this.loadingService.showLoading('正在上存头像');
      this.cameraService.uploadFile(this.storageService.read('token'), res, '/user/uploadFile').then((res: any) => {
      
        if (res && res.response) {
          let tempRes = JSON.parse(res.response);
          if(tempRes && tempRes.msg == 'OK'){
            this.userInfo.headimgurl = tempRes.data;
            this.storageService.write('UserInfo', this.userInfo);
            // 广播通知更新
            this.events.publish('UserInfo');
          }
         
        }
        this.loadingService.hideLoading();
      })
    })
  }




  /**
   * 保存事件
   */
  onSave() {
    if (!this.userInfo.nickname) {
      this.toastService.showToast('昵称不能为空！');
      return;
    }

    this.loadingService.showLoading();
    this.httpService.post('/user/update', this.userInfo).then((res: any) => {
      this.loadingService.hideLoading();
      if (res && res.msg == 'OK') {
        this.storageService.write('UserInfo', this.userInfo);
        this.toastService.showToast('保存成功');
        // 广播通知更新
        this.events.publish('UserInfo');
      }
    })
  }

}
