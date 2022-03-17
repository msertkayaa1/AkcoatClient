import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseService } from "./base.service";
import { environment } from "../../environments/environment";
import { EndPoints } from "./end-points";
import { Observable } from "rxjs";
import { ResponseData } from "../models/response/response-data";
import { RolePermissionResponse } from "../models/response/role-permission-response";
import { PageRoleListFilter } from "../models/filter/page-role-list-filter";
import { PageRoles } from "../models/page-roles";
import { PermissionListFilter } from "../models/filter/permission-list-filter";
import { PaginatedResponse } from "../models/response/paginated-reponse";


@Injectable()
export class PermissionService {
  constructor(private http: HttpClient, private baseService: BaseService) {}

 

  update(rolePermissionResponse: any):Observable<ResponseData<RolePermissionResponse>> {
    return this.baseService.update<RolePermissionResponse>(
      rolePermissionResponse,
      environment.serverBaseUrl,
      EndPoints.PERMISSION + "/Update"
    );
  }


  

  getAllPermission(filter:PermissionListFilter): Observable<PaginatedResponse<RolePermissionResponse>> {
    return this.baseService.listpost<RolePermissionResponse>(
      filter,
      environment.serverBaseUrl,
      EndPoints.PERMISSION+'/GetListByFilterAsync'
    );
  }

  getPageRoles(filter:PageRoleListFilter): Observable<PaginatedResponse<PageRoles>> {
    return this.baseService.listpost<PageRoles>(
      filter,
      environment.serverBaseUrl,
      EndPoints.PERMISSION+'/GetPageRoleListByFilterAsync'
    );
  }
}
