import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { UserService } from "./user.service";
import { ResponseData } from "../models/response/response-data";
import { PaginatedResponse } from "../models/response/paginated-reponse";


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(private http: HttpClient) {}

  private createTokenOptions() {
  
    return {
      headers: new HttpHeaders().set(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      )
    };
  }

 

  public post<T>(item:any, base_url:string, end_point:any): Observable<ResponseData<T>> {
  

    return this.http.post<ResponseData<T>>(
      `${base_url}/${end_point}`,
      item,
      this.createTokenOptions()
    );
  }

  public update<T>(item:any, base_url:string, end_point:any): Observable<ResponseData<T>> {
    return this.http.post<ResponseData<T>>(
      `${base_url}/${end_point}`,
      item,
      this.createTokenOptions()
    );
  }

  public get<T>(id: any, base_url:string, end_point:any): Observable<ResponseData<T>> {
    return this.http.get<ResponseData<T>>(
      `${base_url}/${end_point}/${id}`,
      this.createTokenOptions()
    );
  }

  
  public getFile<T>(id: any, base_url:string, end_point:any): Observable<any> {
   
    let uri = `${base_url}/${end_point}/${id}`;
    // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
    return this.http.get(uri, { responseType: 'blob' });
    // return this.http.get<T>(
    //   `${base_url}/${end_point}/${id}`,
    //   { responseType: 'blob' }
    // );
    // return this.http.get(uri, { responseType: 'blob' });
  }

  public getQuery<T>(queryOptions: any, base_url:string, end_point:any): Observable<ResponseData<T>> {
    return this.http.get<ResponseData<T>>(
      `${base_url}/${end_point}?${queryOptions}`,
      this.createTokenOptions()
    );
  }

  public list<T>(queryOptions: string, base_url:string, end_point:any): Observable<PaginatedResponse<T>> {
    return this.http.get<PaginatedResponse<T>>(
      `${base_url}/${end_point}?${queryOptions}`,
      this.createTokenOptions()
    );
  }

  public listpost<T>(item:any,  base_url:string, end_point:any): Observable<PaginatedResponse<T>> {
  

    return this.http.post<PaginatedResponse<T>>(
      `${base_url}/${end_point}`,
      item,
      this.createTokenOptions()
    );
  }

 


  public delete(id: number,  base_url:string, end_point:any): Observable<ResponseData<any>> {
    return this.http.delete<ResponseData<any>>(
      `${base_url}/${end_point}/${id}`,
      this.createTokenOptions()
    );
  }
}
