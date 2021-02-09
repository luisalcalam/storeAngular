import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HomeComponent } from './pages/home/home.component';
import { SaleComponent } from './pages/sale/sale.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductCardComponent } from './components/product-card/product-card.component';

import { MaterialModule } from '../material/material.module';
import { ListComponent } from './pages/list/list.component';
import { ReceiptsComponent } from './pages/receipts/receipts.component';
import { CatalogsComponent } from './pages/catalogs/catalogs.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';


@NgModule({
  declarations: [
    HomeComponent, 
    SaleComponent, ProductCardComponent, ListComponent, ReceiptsComponent, CatalogsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    DialogsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule
  ]
})
export class ProductsModule { }
