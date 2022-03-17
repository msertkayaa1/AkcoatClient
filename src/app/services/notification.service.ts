import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseService } from "./base.service";
import { environment } from "../../environments/environment";
import { EndPoints } from "./end-points";
import { MessageData } from "../models/message-data";
import { isNullOrUndefined } from "util";
import { NotificationListFilter } from "../models/filter/notification-list-filter";
import { PaginatedResponse } from "../models/response/paginated-reponse";
import {Observable} from 'rxjs';
import { ResponseData } from "../models/response/response-data";
import { NotificationFilter } from "../models/filter/notification-filter";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: HttpClient, private baseService: BaseService) {}

  create(messageData: MessageData) :Observable<ResponseData<MessageData>> {
   
    return this.baseService.post<MessageData>(
      messageData,
      environment.serverBaseUrl,
      EndPoints.NOTIFICATION+'/Create'
    );
  }

  allReadUpdate(messagesData: any):Observable<ResponseData<boolean>> {
    return this.baseService.update<boolean>(
      messagesData,
      environment.serverBaseUrl,
      EndPoints.NOTIFICATION + "/AllReadUpdate"
    );
  }

  
 update(messageData: any):Observable<ResponseData<MessageData>> {
    return this.baseService.update<MessageData>(
      messageData,
      environment.serverBaseUrl,
      EndPoints.NOTIFICATION + "/Update"
    );
  }

  delete(id: any): Observable<ResponseData<any>> {
   
    return this.baseService.delete(
      id,
      environment.serverBaseUrl,
      EndPoints.NOTIFICATION + "/Delete"
    );
  }

  getMessageData(filter:NotificationFilter): Observable<ResponseData<MessageData>>  {

    return this.baseService.post<MessageData>(
      filter,
      environment.serverBaseUrl,
      EndPoints.NOTIFICATION+'/GetByFilterAsync'
    );
  }

  getAllMessageData(filter:NotificationListFilter): Observable<PaginatedResponse<MessageData>> {
    return this.baseService.listpost<MessageData>(
      filter,
      environment.serverBaseUrl,
      EndPoints.NOTIFICATION+'/GetListByFilterAsync'
    );
  }
}
