import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'pending',
    loadChildren: () => import('./user-pending-approve/user-pending-approve.module').then(m => m.UserPendingApproveModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
  },
 
];


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
