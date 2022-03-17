import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { UserConfirmComponent } from './user-confirm/user-confirm.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


const routes: Routes = [
{
  path: 'signin',
  component: SigninComponent
  
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path:'confirmation/:id',
  component: UserConfirmComponent
},
{
  path: 'reset-password',
  component: ResetPasswordComponent
},
{
  path: 'forget-password',
  component: ForgetPasswordComponent
},
{
  path:'',
  pathMatch:'full',
  redirectTo:'signin'
}
// {
//   path:'',
//   component: SigninComponent
// }


 ];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule { }

