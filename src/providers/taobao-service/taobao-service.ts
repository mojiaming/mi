import { Injectable } from '@angular/core';
declare var MiTao: any;
import { AppAvailability } from '@ionic-native/app-availability';

/*
  Generated class for the TaobaoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaobaoServiceProvider {
  isTbInit: boolean = false;//是否已成功初始化
  isPdd:boolean = false;//是否已安装拼多多
  constructor(private appAvailability: AppAvailability) {

  }


  /**
   * 初始化
   */
  init() {
    MiTao.init('', () => {
      this.isTbInit = true;
    }, () => {
      this.isTbInit = false;
    })

    this.appAvailability.check('com.xunmeng.pinduoduo').then(isPdd =>{
      this.isPdd = isPdd;
    })
  }


  /**
   * 跳转页面
   * @param url 
   * @param type 
   */
  show(url: string, type: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if ((type == 'pdd' && this.isPdd)|| (type == 'tb' && this.isTbInit)) {
        if(type == 'pdd'){
          url = url.replace('https://mobile.yangkeduo.com', 'pinduoduo://com.xunmeng.pinduoduo');
        }
        MiTao.show({ url: url, type: type }, (msg) => {
          resolve(msg);
        }, (err) => {
          reject(err);
        });
      } else {
        reject();
      }
    })
  }

}
