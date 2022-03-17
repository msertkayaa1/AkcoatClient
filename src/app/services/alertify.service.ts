import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "./user.service";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root',
})

export class AlertifyService {
    constructor(private toastr: ToastrService) {}

    success(title:string='Başarılı',text:string='İşlem Başarılı',isConfirm:boolean=false){
        this.toastr.success(text,title);
   
    }

    error(title:string='Başarısız',text:string='İşlem sırasında hata oluştu',isConfirm:boolean=false){
        this.toastr.error(text,title);
    }

    warning(msg:string){
        this.toastr.error('Uyarı', msg);

    }

}