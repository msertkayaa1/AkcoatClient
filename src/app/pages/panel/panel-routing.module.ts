import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/helpers/auth.guard';
import { RoleGuard } from 'src/app/helpers/role.guard';

const routes: Routes = [


  {
    path: 'panel',
    canActivate: [RoleGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: { roles: ['Superadmin'] }

  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ]
})
export class PanelRoutingModule { }
