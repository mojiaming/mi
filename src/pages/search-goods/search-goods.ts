import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { HelperProvider } from './../../providers/helper/helper';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, NavController, Events } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';

/**
 * Generated class for the SearchGoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-goods',
  templateUrl: 'search-goods.html',
})
export class SearchGoodsPage {
  text: string = '';
  constructor(public viewCtrl: ViewController, public navParams: NavParams,
    public navCtrl: NavController,
    private httpService: HttpServiceProvider,
    private hleper: HelperProvider,
    private loadingService: LoadingServiceProvider,
    private toastService: ToastServiceProvider,
    private storageService: StorageServiceProvider,
    private events: Events) {
  }

  ionViewDidLoad() {
    this.text = this.navParams.get('value');
  }

  /**
   * 查看
   */
  onView() {
    if (this.hleper.isLogin()) {
      this.onClose();
    } else {
      this.events.publish('login:go');
    }
  }

  /**
   * 关闭页面
   */
  onClose() {
    this.viewCtrl.dismiss();
  }
}
