import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SaleComponent } from './pages/sale/sale.component';
import { ListComponent } from './pages/list/list.component';
import { ReceiptsComponent } from './pages/receipts/receipts.component';
import { CatalogsComponent } from './pages/catalogs/catalogs.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'tazas',
        component: SaleComponent
      },
      {
        path: 'listado',
        component: ListComponent
      },
      {
        path: 'entradas',
        component: ReceiptsComponent
      },
      {
        path: 'catalogos',
        component: CatalogsComponent
      },
      {
        path: '**',
        redirectTo: 'listado'
      }
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductsRoutingModule { }
