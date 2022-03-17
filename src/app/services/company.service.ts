import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseService } from "./base.service";
import { EndPoints } from "./end-points";
import { Company } from "../models/company";

import {Observable} from 'rxjs';
import { ResponseData } from "src/app/models/response/response-data";
import { environment } from "src/environments/environment";
import { CompanyFilter } from "src/app/models/filter/company-filter";
import { CompanyListFilter } from "src/app/models/filter/company-list-filter";
import { PaginatedResponse } from "src/app/models/response/paginated-reponse";


@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient, private baseService: BaseService) {}

  create(Company: Company) :Observable<ResponseData<Company>> {
   
    return this.baseService.post<Company>(
      Company,
      environment.serverBaseUrl,
      EndPoints.COMPANY+'/Create'
    );
  }

  update(Company: any):Observable<ResponseData<Company>> {
    return this.baseService.update<Company>(
      Company,
      environment.serverBaseUrl,
      EndPoints.COMPANY + "/Update"
    );
  }

  delete(id: any): Observable<ResponseData<any>> {
   
    return this.baseService.get(
      id,
      environment.serverBaseUrl,
      EndPoints.COMPANY + "/Delete"
    );
  }

  getCompany(filter:CompanyFilter): Observable<ResponseData<Company>>  {

    return this.baseService.post<Company>(
      filter,
      environment.serverBaseUrl,
      EndPoints.COMPANY+'/GetByFilterAsync'
    );
  }

  getAllCompany(filter:CompanyListFilter): Observable<PaginatedResponse<Company>> {
    return this.baseService.listpost<Company>(
      filter,
      environment.serverBaseUrl,
      EndPoints.COMPANY+'/GetListByFilterAsync'
    );
  }
}
