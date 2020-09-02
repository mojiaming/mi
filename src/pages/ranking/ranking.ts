import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';

/**
 * Generated class for the RankingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {

  state: string = 'the';
  theData: Array<any> = [];
  beforeData: Array<any> = [];
  constructor(
    private navCtrl: NavController,
    private httpService: HttpServiceProvider,
    private loadingService: LoadingServiceProvider) {
  }

  ionViewDidLoad() {
    this.loadingService.showLoading();

    
    this.httpService.get("/randing.json").then((res: any) => {
      if (res && res.msg == 'OK') {
        this.theData = res.data;
      }
    })

    this.httpService.get("/randing.json").then((res: any) => {
      if (res && res.msg == 'OK') {
        this.loadingService.hideLoading();
        this.beforeData = res.data;
      }
    })
  }

  onRules(){
    this.navCtrl.push('RankingRulesPage');
  }

}
