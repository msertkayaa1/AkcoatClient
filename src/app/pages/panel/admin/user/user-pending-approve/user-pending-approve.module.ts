import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPendingApproveComponent } from './user-pending-approve/user-pending-approve.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserDetailComponent } from './user-pending-approve/user-detail/user-detail.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: UserPendingApproveComponent
  },
  {
    path: ':id',
    pathMatch:'full',
    component: UserDetailComponent
  }
];



@NgModule({
  declarations: [
    UserPendingApproveComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserPendingApproveModule { }
