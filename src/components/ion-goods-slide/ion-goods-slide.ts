import { ViewController } from 'ionic-angular';
import { Component, Input, OnChanges } from '@angular/core';

/**
 * Generated class for the IonGoodsSlideComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-goods-slide',
  templateUrl: 'ion-goods-slide.html'
})
export class IonGoodsSlideComponent implements OnChanges{

  hosGoods1 = [];
  hosGoods2 = [];
  hosGoods3 = [];
  hosGoods4 = [];

  @Input()
  goodsList: Array<any>;//商品集合
  @Input()
  type: string = 'TB';//默认类型为淘宝
  constructor(private viewCtrl: ViewController) {

  }
  ngOnChanges() {
    if (this.goodsList && this.goodsList.length > 0) {
      this.hosGoods1 = this.goodsList.slice(0, 3);
      this.hosGoods2 = this.goodsList.slice(3, 6);
      this.hosGoods3 = this.goodsList.slice(6, 9);
      this.hosGoods4 = this.goodsList.slice(9, 12);
    }
  }

  onGoods(item) {
    if(this.type == 'TB'){
      this.viewCtrl.getNav().push('GoodsDetailedPage', { goods: item.item_id });
    } else if(this.type == 'PDD'){
      this.viewCtrl.getNav().push('PddGoodsDetailedPage', { value: item.goods_id });
    }

  }

}
