import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerServicePage } from './customer-service';

@NgModule({
  declarations: [
    CustomerServicePage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerServicePage),
  ],
})
export class CustomerServicePageModule {}
