import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";



@Injectable({
  providedIn: 'root',
})
export class SharedService {
  messageSource: BehaviorSubject<string> = new BehaviorSubject("");

  backUrlSubject: BehaviorSubject<string> = new BehaviorSubject("");
  backUrl: Observable<string>;

  
 
  

  public loadingSubject: BehaviorSubject<boolean>;
  public loading: Observable<boolean>;

  

  messageCount: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor() {

    this.loadingSubject = new BehaviorSubject<any>(false);
    this.loading = this.loadingSubject.asObservable();

   
    this.backUrlSubject = new BehaviorSubject<any>(false);
    this.backUrl = this.backUrlSubject.asObservable();

    
  }
  public get allMessageCountValue(): number {
    return this.messageCount.value;
  }

  // tslint:disable-next-line:typedef
  public allMessageCountSetValue(value:any) {
    this.messageCount.next(value);
  }


  //LOADER
  public loadingSetValue(value: any) {

    this.loadingSubject.next(value);
 }


 public get loadingValue(): boolean {
   return this.loadingSubject.value;
 }


  //BACK URL
  public backUrlSetValue(value: any) {

    this.backUrlSubject.next(value);
 }


 public get backUrlValue(): string {
   return this.backUrlSubject.value;
 }


 
  public get messageSourceValue(): string {
    return this.messageSource.value;
  }

  // tslint:disable-next-line:typedef
  public messageSourceSetValue(value:any) {
    this.messageSource.next(value);
  }

  



}
