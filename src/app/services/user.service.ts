import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { EndPoints } from './end-points';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../models/login';
import { ForgetPassword } from '../models/forgot-password';
import { AuthenticateResponse } from '../models/authenticate-response';
import { ResetPassword } from '../models/reset-password';
import { UserResetPassword } from '../models/user-reset-password';
import { Router } from '@angular/router';

import {ResponseData} from '../models/response/response-data'
import  { ApplicationUser} from '../models/entity/user/application-user'
import * as _ from 'lodash';
import { Company } from '../models/company';
import { TranslateService } from '@ngx-translate/core';
import { LoginMFAResponse } from '../models/dto/login-mfa-response';
import { environment } from '../../environments/environment';
import { LoginMFAConfirm } from '../models/dto/login-mfa-confirm';
import { ConfirmCodeResponse } from '../models/confirm-code-response';
import { PaginatedResponse } from '../models/response/paginated-reponse';
import { RoleChange } from '../models/role-change';
import { UserProfile } from '../models/user-profile';
import { UserListFilter } from '../models/filter/user/user-list-filter';
import { UserConfirm } from '../models/dto/user-confirm';
import { CultureInfo } from 'src/assets/i18n/culture-info';


@Injectable(
  {
    providedIn: 'root',
  }
)
export class UserService {
  private currentUserSubject: BehaviorSubject<AuthenticateResponse> | null;
  public currentUser: Observable<AuthenticateResponse>;
  

  private currentUserCompanySubject: BehaviorSubject<Company>;
  public currentUserCompany: Observable<Company>;

  private currentUserEmailSubject: BehaviorSubject<string>;
  public currentUserEmail: Observable<string>;


  public currentLangSubject: BehaviorSubject<string>;
  public currentLang: Observable<string>;


  public langJsonDataSubject: BehaviorSubject<any>;
  public langJsonData: Observable<any>;

  



  constructor(private http: HttpClient,private translateService: TranslateService, private baseService: BaseService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<AuthenticateResponse>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();

    this.currentUserCompanySubject= new BehaviorSubject<Company>(JSON.parse(localStorage.getItem('currentUserCompany') || '{}'));
    this.currentUserCompany = this.currentUserCompanySubject.asObservable();

    this.currentUserEmailSubject= new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentUserEmail') || '{}' ));
    this.currentUserEmail = this.currentUserEmailSubject.asObservable();

    this.currentLangSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentLang') || '{}'));
    this.currentLang = this.currentLangSubject.asObservable();


    this.langJsonDataSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('langData') || '{}'));
    this.langJsonData = this.langJsonDataSubject.asObservable();
  }

  public get currentUserValue(): AuthenticateResponse | null  {
    if(this.currentUserSubject){
       let currentValue= this.currentUserSubject.value;
      if (!_.isEmpty(currentValue)) {
            return this.currentUserSubject.value;
      }  else{
        return null;
      }
    } 
    else{
      return null;
    }
  }

  public get currentUserCompanyValue(): Company {
    return this.currentUserCompanySubject.value;
  }

  public get currentUserEmailValue(): string {
    if(!this.currentUserEmailSubject.value){
      this.currentUserEmailSubject= new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentUserEmail') || '{}'));
      this.currentUserEmail = this.currentUserEmailSubject.asObservable();
    }
    return this.currentUserEmailSubject.value;
  }


  public get currentUserCompanyIdValue(): string {
    return this.currentUserValue?this.currentUserValue.companyId:'';
  }
  

   //LANG DATA
   public langJsonSetValue(value: any) {

    localStorage.setItem('langData', JSON.stringify(value))
    this.langJsonDataSubject.next(value);
  }


  public get langJsonValue(): any {

    if (!this.langJsonDataSubject.value) {
      this.langJsonDataSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('langData') || '{}'));
    }

    return this.langJsonDataSubject.value;


  }
  
  //USER LANG

  public langConvert(prop: string) {

    let data = _.get(this.langJsonValue, prop);;
    return data;
  }


  public get currentLangValue(): string {
    if (!this.translateService.currentLang) {
      if (!this.currentLangSubject.value) {
        this.currentLangSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentLang') || '{}'));
      }

      return this.currentLangSubject.value;
    }
    else {
      return this.translateService.currentLang;
    }

  }



  
  public currentLangSetValue(value: any) {
    let cultureCode = this.cultureCode(value);
    localStorage.setItem('currentLang', JSON.stringify(value))
    localStorage.setItem('currentCultureLang', JSON.stringify(cultureCode))
    this.currentLangSubject.next(value);

  }


  cultureCode(value: string) {

    let lang = CultureInfo.find(p => p.twoLetterLangCode == value);
    if (lang)
      return lang.cultureInfoCode;
    else
      return "";
  }



  public getUserFullName() {
    const currentUser = this.currentUserValue;
    if (currentUser) {
      // logged in so return true
      return currentUser.name + ' '+ currentUser.surname ;
    }

    return 'MyIdea';

  }

  isCouncilor() {
    return this.hasRole("Councilor");

  }


  // tslint:disable-next-line:typedef
  public currentUserSetValue(value:any) {
    this.currentUserSubject?.next(value);
    localStorage.setItem('currentUser', JSON.stringify(value));

  }

  public currentUserCompanySetValue(value:any) {
    this.currentUserCompanySubject.next(value);
    localStorage.setItem('currentUserCompany', JSON.stringify(value));

  }

  public currentUserEmailSetValue(value:any) {
    this.currentUserEmailSubject.next(value);
    localStorage.setItem('currentUserEmail', JSON.stringify(value));

  }

 

  public isAuthorized() {
    const currentUser = this.currentUserValue;
    if (!_.isEmpty(currentUser)) {
      // logged in so return true
      return true;
    }

    return false;

  }

  
  public hasPermission(permission:string) {
    if (this.currentUserValue != null) {
      let permissions = this.currentUserValue.permissions;
     
      if (permissions.length > 0) {
        let isCheck = permissions.filter(p => p.pages.pageName.toLowerCase() == permission.toLowerCase());
        if (isCheck.length > 0)
          return this.isAuthorized() && isCheck[0].isPermission == true;
        else
          return false;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

  public hasRole(role:string) {
    if (this.currentUserValue != null) {
      let roles = this.currentUserValue.roles;
      if (roles != null) {
        return this.isAuthorized() && roles.filter(p => p.toLowerCase() == role.toLowerCase()).length > 0;
      }
      else {
        return false;
      }
    }
    else{
      return false;
    }
  }

  // tslint:disable-next-line: typedef
  login(login: Login):Observable<ResponseData<AuthenticateResponse>> {

    return this.baseService.post<AuthenticateResponse>(
      login,
      environment.serverBaseUrl,
      EndPoints.USERS + '/login'
    );
  }

  // tslint:disable-next-line: typedef
  LoginMFA(login: LoginMFAConfirm):Observable<ResponseData<AuthenticateResponse>> {

    return this.baseService.post<AuthenticateResponse>(
      login,
      environment.serverBaseUrl,
      EndPoints.USERS + '/LoginMFA'
    );
  }




  // tslint:disable-next-line: typedef
  register(user: any) {
    return this.baseService.post<any>(
      user,
      environment.serverBaseUrl,
      EndPoints.USERS + '/register'
    );
  }

// tslint:disable-next-line: typedef
  userConfirm(confirm: UserConfirm) {
    return this.baseService.post<any>(
      confirm,
      environment.serverBaseUrl,
      EndPoints.USERS + '/confirmation'
    );
  }



  forgotpassword(reset: ForgetPassword): Observable<ResponseData<string>> {
    return this.baseService.post<string>(
      reset,
      environment.serverBaseUrl,
      EndPoints.USERS + '/ForgotPassword'
    );
  }

  
  // tslint:disable-next-line: typedef
  confirmCode(confirm: ConfirmCodeResponse): Observable<ResponseData<string>> {
    return this.baseService.post<string>(
      confirm,
      environment.serverBaseUrl,
      EndPoints.USERS + '/ConfirmCode'
    );
  }


 

  // tslint:disable-next-line: typedef
  create(user: ApplicationUser) {

    return this.baseService.post<ApplicationUser>(
      user,
      environment.serverBaseUrl,
      EndPoints.USERS + '/register'
    );
  }


  // tslint:disable-next-line: typedef
  update(user: ApplicationUser) {
    return this.baseService.update<ApplicationUser>(
      user,
      environment.serverBaseUrl,
      EndPoints.USERS + '/updateUser'
    );
  }

  // tslint:disable-next-line: typedef
  delete(id: number) {
    return this.baseService.get(
      id,
      environment.serverBaseUrl,
      EndPoints.USERS +'/delete'
    );
  } 
  
  // tslint:disable-next-line: typedef
  userChangeStatus(id: number) {
    return this.baseService.get(
      id,
      environment.serverBaseUrl,
      EndPoints.USERS +'/userChangeStatus'
    );
  }

  // tslint:disable-next-line:typedef
  getUserById(id: string) {
    return this.baseService.get<ResponseData<ApplicationUser>>(
      id,
      environment.serverBaseUrl,
      EndPoints.USERS + '/GetUserById'
    );
  }

  

  // tslint:disable-next-line:typedef
  getUserListByFilter(userListFilter:UserListFilter): Observable<PaginatedResponse<ApplicationUser>>{
    return this.baseService.listpost<ApplicationUser>(
      userListFilter,
      environment.serverBaseUrl,
      EndPoints.USERS + '/GetUserListByFilter'
    );
  }


  profileUpdate(user: ApplicationUser):Observable<ResponseData<ApplicationUser>> {
    return this.baseService.post<ApplicationUser>(
      user,
      environment.serverBaseUrl,
      EndPoints.USERS + "/UpdateProfile"
    );

  }

  resetPassword(resetUser: UserResetPassword):Observable<ResponseData<any>> {
    return this.baseService.post<any>(
      resetUser,
      environment.serverBaseUrl,
      EndPoints.USERS + "/ResetPassword"
    );
  }

  profileResetPassword(resetUser: ResetPassword):Observable<ResponseData<any>> {
    return this.baseService.post<any>(
      resetUser,
      environment.serverBaseUrl,
      EndPoints.USERS + "/ResetPassword"
    );
  }

  roleChange(roleChange: RoleChange):Observable<ResponseData<any>> {
    return this.baseService.post<any>(
      roleChange,
      environment.serverBaseUrl,
      EndPoints.USERS + "/RoleChange"
    );
  }



  getProfileById(id:string):Observable<ResponseData<UserProfile>> {
    return this.baseService.get<UserProfile>(
      id,
      environment.serverBaseUrl,
      EndPoints.USERS + "/GetProfileById"
    );
  }

  updateProfile(profile:UserProfile):Observable<ResponseData<UserProfile>> {
    return this.baseService.post<UserProfile>(
      profile,
      environment.serverBaseUrl,
      EndPoints.USERS + "/UpdateProfile"
    );
  }



  // tslint:disable-next-line:typedef
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');

    this.currentUserSetValue(null);
    this.router.navigate(['/auth/signin'])
  }
}
