import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { TabsPage } from '../../pages/tabs/tabs';

/**
 * Generated class for the IonGoHomeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-go-home',
  templateUrl: 'ion-go-home.html'
})
export class IonGoHomeComponent {



  constructor(private navCtrl: NavController) {
   
  }

  onBack(){
    this.navCtrl.setRoot(TabsPage, { value: 0 });
  }

}
