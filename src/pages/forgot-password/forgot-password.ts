import { Validators } from './../../providers/validators/Validators';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { Md5 } from 'ts-md5/dist/md5';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  forgotForm: FormGroup;//表单
  btTimeText: string = '获取';//倒计时按钮文字
  submitted: boolean;//是否禁用提交按钮
  emailTime: any;//发邮件倒计时
  leftTime: number;//剩余时间

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,
    private toastService: ToastServiceProvider,
    private httpService: HttpServiceProvider,
    private storageService: StorageServiceProvider,
    private loadingService: LoadingServiceProvider) {

    this.forgotForm = this.formBuilder.group({
      username: [this.storageService.read('username') ? this.storageService.read('username') : '', [Validators.phone]],
      mailCode: [, [Validators.required, Validators.minLength(6)]],
      password: [, [Validators.required, Validators.minLength(4), Validators.pattern(new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/))]]
    });
  }

  ionViewDidLoad() {
    this.setEamilTime();
  }


  /**
   * 获取邮箱验证码
   */
  getMailCode(user) {
    // console.log(user)
    this.submitted = true;
    this.httpService.post('/user/sendMail', { username: user.username, type: 'forgot:' }).then((res: any) => {

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
   * 提交
   * @param user 
   */
  confirm(user) {
    this.loadingService.showLoading();
    user.mailCode = user.mailCode.toUpperCase();
    user.password = Md5.hashStr(user.password);
    this.httpService.post('/user/forgotPassword', user).then((res: any) => {
      this.loadingService.hideLoading();
      if (res && res.msg == 'OK') {
        this.toastService.showToast('重置成功');
        this.storageService.write('username', user.username);
        this.navCtrl.setRoot('LoginEmailPage');
      } else if (res.msg) {
        this.toastService.showToast(res.msg);
      }
    })
  }
}
