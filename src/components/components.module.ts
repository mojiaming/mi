import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { IonicModule } from 'ionic-angular';
import { IonGoHomeComponent } from './ion-go-home/ion-go-home';
import { IonGoodsSlideComponent } from './ion-goods-slide/ion-goods-slide';
@NgModule({
	declarations: [ProgressBarComponent,
    IonGoHomeComponent,
    IonGoodsSlideComponent],
	imports: [IonicModule],
	exports: [ProgressBarComponent,
    IonGoHomeComponent,
    IonGoodsSlideComponent]
})
export class ComponentsModule {}
