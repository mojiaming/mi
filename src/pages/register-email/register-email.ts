import { Validators } from './../../providers/validators/Validators';
import { GlobalDataProvider } from './../../providers/global-data/global-data';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Md5 } from 'ts-md5/dist/md5';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the RegisterEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'RegisterEmailPage',
  segment: 'register-email/:inviteCode'
})
@Component({
  selector: 'page-register-email',
  templateUrl: 'register-email.html',
})
export class RegisterEmailPage {
  registerForm: any;//表单
  btTimeText: string = '获取';//倒计时按钮文字
  submitted: boolean;//是否禁用提交按钮
  emailTime: any;//发邮件倒计时
  leftTime: number;//剩余时间
  inviteUser = null;//邀请用户信息
  isInvite: boolean = true;//是否已关联相关用户
  code: string = '';//邀请码
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,
    private toastService: ToastServiceProvider,
    private httpService: HttpServiceProvider,
    private storageService: StorageServiceProvider,
    private loadingService: LoadingServiceProvider,
    private globalData: GlobalDataProvider) {
    this.registerForm = this.formBuilder.group({
      username: [, [Validators.required, Validators.phone]],
      mailCode: [, [Validators.required, Validators.minLength(6)]],
      // password: [, [Validators.required, Validators.minLength(4), Validators.pattern(new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/))]],
      // code: [, [Validators.required, Validators.minLength(6)]]
    });
  }

  ionViewDidLoad() {
    this.code = this.navParams.get('inviteCode');
    if (this.code) {
      // this.registerForm.controls.code.setValue(code);
      this.changeCode(this.code);
    }
    this.setEamilTime();
  }

  /**
   * 获取邮箱验证码
   */
  getMailCode(user) {
    // console.log(user)
    this.submitted = true;
    this.httpService.post('/user/sendMail', { username: user.username, type: 'login:' }).then((res: any) => {
      if (res && res.msg == 'OK') {
        this.toastService.showToast('验证码已发送，请注意查收...');
        this.storageService.write('email:time', new Date().getTime());
        this.setEamilTime();
      } else {
        this.submitted = false;
        this.toastService.showToast(res.msg);
      }
    })
  }


  setEamilTime() {


    let emailtime = this.storageService.read('email:time');
    let newtime = new Date().getTime();
    if (!emailtime) {
      return;
    }

    let left = (60 * 1000) - (newtime - Number(emailtime));

    if (left && left > 0) {
      this.submitted = true;
      this.emailTime = setInterval(() => {
        if (left > 0) {
          this.leftTime = Math.ceil(left / 1000);
          left -= 1000;
          this.btTimeText = this.leftTime + '';
        } else {
          this.leftTime = 0;
          this.submitted = false;
          this.btTimeText = '获取';
          clearInterval(this.emailTime);
          this.emailTime = null;
        }
      }, 1000);
    }

  }

  /**
   * 注册事件
   * @param user 
   */
  confirm(user) {
    this.loadingService.showLoading();
    user.mailCode = user.mailCode.toUpperCase();
    if(this.code){
      user['code'] = this.code;
    }
    user['password'] = Md5.hashStr(new Date().getTime().toString());
    this.httpService.post('/user/registerEmail', user).then((res: any) => {
      this.loadingService.hideLoading();
      if (res && res.msg == 'OK') {
        // this.toastService.showToast('注册成功');
        this.storageService.write('username', user.username);
        res.data.password = user.password;
        res.data.username = user.username;
        this.storageService.write('UserInfo', res.data);
        this.storageService.write('login:type', 'phone');
        this.globalData.username = res.data.nickname;
        this.globalData.token = res.data.token;
        this.storageService.write('token', this.globalData.token);
        this.storageService.write('username', user.username);
        if(this.navParams.get('inviteCode')){
          this.navCtrl.setRoot('AppDownloadPage');
        } else {
          this.navCtrl.setRoot(TabsPage, { value: 0 });
        }
        
      } else if (res.msg) {
        this.toastService.showToast(res.msg);
      }
    })
  }

  /**
   * 更改事件
   */
  changeCode(code) {
    this.inviteUser = null;
    this.isInvite = true;
    if (code.length == 6) {
      this.httpService.post('/user/selectCode', { code: code }).then((res: any) => {
        if (res && res.msg == 'OK' && res.data) {
          this.isInvite = false;
          this.inviteUser = res.data;
        } else {
          this.toastService.showToast('邀请码错误，未找到关联用户');
        }
      })

    }
  }
}
