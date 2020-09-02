import { TabsPage } from './../tabs/tabs';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
import { Validators } from '../../providers/validators/Validators';
/**
 * Generated class for the LoginEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-email',
  templateUrl: 'login-email.html',
})
export class LoginEmailPage {
  userInfo: any;//用户信息对象
  submitted: boolean = false;//登录按钮状态
  loginForm: FormGroup;//form表单对象
  myDate: Date;//时间
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,
    private storageService: StorageServiceProvider,
    private httpService: HttpServiceProvider,
    private toastService: ToastServiceProvider,
    private globalData: GlobalDataProvider) {
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter(){
    let username = this.storageService.read('username');
    if(username){
      this.loginForm.controls.username.setValue(username);
      // this.loginForm.controls.password = user.password;
    }
  }

  ngOnInit() {
    this.userInfo = this.storageService.read('UserInfo');
    this.loginForm = this.formBuilder.group({//, Validators.minLength(4)
      username: [this.userInfo ? this.userInfo.username : '', [Validators.phone]],// 第一个参数是默认值
      password: ['', [Validators.required,Validators.minLength(4)]]
    });
  }

  login(user){
    this.submitted = true;
    // let password = user.password+'';
    user.password = Md5.hashStr(user.password);

    this.navCtrl.setRoot(TabsPage, { value: 0 });
  }


  /**
   * 注册事件
   */
  onRegister(){
    this.navCtrl.push('RegisterEmailPage');
  }

  /**
   * 找回密码事件
   */
  onRetrieve(){
    this.navCtrl.push('ForgotPasswordPage');
  }
}
