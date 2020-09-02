import { Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';
import 'rxjs/add/operator/timeout';
import { ToastServiceProvider } from '../toast-service/toast-service';
import { LoadingServiceProvider } from '../loading-service/loading-service';
import { AlertServiceProvider } from '../alert-service/alert-service';
import { HelperProvider } from '../helper/helper';

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {
  text: any;//文本
  constructor(public http: HttpClient,
    private config: ConfigProvider,
    private toast: ToastServiceProvider,
    private loading: LoadingServiceProvider,
    private alertService: AlertServiceProvider,
    private events: Events,
    private helper: HelperProvider) {
    this.text = {
      "ZERO": "请求响应错误，请检查网络",
      "FOUR": "请求链接不存在，请联系管理员",
      "FIVE": "系统开了个小差，请稍后再试",
      "ERROR": "未知错误，请检查网络"
    };
  }

  /**
   * get 请求
   * @param url 
   * @param params 
   */
  public get(url: string, params?: string) {
    if (!!!!params) {
      url = url + encodeURI(params);
    }
    return this.http.get(ConfigProvider.API_URL + url, this.config.getHeaders())
      .toPromise()
      .catch(err => this.handleError(err));

  }



  /**
   * post 请求
   * @param url 
   * @param paramObj 
   */
  public post(url: string, paramObj: any) {
    return this.http.post(ConfigProvider.API_URL + url, paramObj, this.config.getHeaders())
      .toPromise()
      .catch(error => this.handleError(error));

  }



  /**
   * 请求失败处理
   * @param error 
   */
  private handleError(error: Response | any) {
    let status = error.status;
    this.loading.hideLoading();
    if (status === 0) {
      if (!!!!this.text && this.text.ZERO) {
        this.toast.showToast(this.text.ZERO);
      }
    } else if (status === 404) {
      if (!!!!this.text && this.text.FOUR) {
        this.toast.showToast(this.text.FOUR);
      }
    } else if (status === 500) {
      if (!!!!this.text && this.text.FIVE) {
        this.toast.showToast(this.text.FIVE);
      }
    } else if (status === 401) {
      if(this.helper.isWXBrowser()){
        this.alertService.showAlert("登录已过期，请返回重新进入");
      } else {
        this.events.publish('user:login');
      }
    } else {
      if (!!!!this.text && this.text.ERROR) {
        this.toast.showToast(this.text.ERROR);
      }
      // return Observable.throw('Server Error');
   
    }
    return '';
  }


}
