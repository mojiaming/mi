import { ToastServiceProvider } from './../../providers/toast-service/toast-service';
import { LoadingServiceProvider } from './../../providers/loading-service/loading-service';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the AssociatedAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-associated-account',
  templateUrl: 'associated-account.html',
})
export class AssociatedAccountPage {

  code: string = '';//关联码
  user:any = null;//用户信息

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private loadingService: LoadingServiceProvider,
    private toastService: ToastServiceProvider,
    private storageService: StorageServiceProvider,
    private globalData: GlobalDataProvider) {
  }

  ionViewDidLoad() {
    
  }


  /**
   * 验证事件
   */
  onAuth(){
    
  }

  /**
   * 关联事件
   */
  onAssociated(){
 
  }

  onChange(){
    if(!this.code){
      this.user = null;
    }
  }
}
