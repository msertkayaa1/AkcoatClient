import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { PanelLayoutComponent } from './layouts/panel-layout/panel-layout.component';

const routes: Routes = [
  {
  path: '',
 canActivate: [AuthGuard],
  component: PanelLayoutComponent,
  loadChildren: () => import('../app/pages/panel/panel.module').then(m => m.PanelModule ),
},
{
  path:'auth',
  component: AuthLayoutComponent,
  loadChildren: () => import('../app/pages/auth/auth.module').then(m => m.AuthModule)

},




]


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
