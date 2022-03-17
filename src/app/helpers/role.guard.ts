

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../services/user.service';
import * as _ from 'lodash';
import { AuthenticateResponse } from '../models/authenticate-response';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  public currentUserSubject: BehaviorSubject<AuthenticateResponse>;
  public currentUser: Observable<AuthenticateResponse>;
  isUser: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,

  ) {

    this.currentUserSubject = new BehaviorSubject<AuthenticateResponse>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();

  }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.userService.isAuthorized()) {

      let isPermission = route.data.roles?.find((x: any) => this.userService.currentUserValue?.roles.includes(x));

      if (!isPermission) {
        this.router.navigate(['/unauthorized'], { queryParams: { returnUrl: state.url } });
        return false;
      }


      return true;
    }

    return true;




  }


}
