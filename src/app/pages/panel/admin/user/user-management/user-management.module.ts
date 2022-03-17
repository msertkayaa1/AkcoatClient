import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserCreateComponent } from './user-create/user-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent
  },
  {
    path: 'create',
    component: UserCreateComponent
  },
  {
    path: ':id',
    component: UserEditComponent
  }

];


@NgModule({
  declarations: [
    UserManagementComponent,
    UserCreateComponent,UserEditComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ]
})
export class UserManagementModule { }
