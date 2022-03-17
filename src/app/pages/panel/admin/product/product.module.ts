import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes: Routes = [
  {
    path: '',
    redirectTo:'list'
  },
  {
    path: 'list',
    component:ProductListComponent
  },
  {
    path: 'create',
    component:ProductCreateComponent
  },
  {
    path: 'edit',
    component:ProductEditComponent
  },
 
];


@NgModule({
  declarations: [
    ProductListComponent,
    ProductCreateComponent,
    ProductEditComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
