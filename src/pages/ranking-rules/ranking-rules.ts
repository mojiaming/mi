import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

/**
 * Generated class for the RankingRulesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ranking-rules',
  templateUrl: 'ranking-rules.html',
})
export class RankingRulesPage {

  system:any;

  constructor(private httpService: HttpServiceProvider,) {
  }

  ionViewDidLoad() {

  }

}
