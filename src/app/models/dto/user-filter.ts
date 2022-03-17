import { PaginationFilter } from "../filter/pagination-filter";

export class UserFilter extends PaginationFilter{
     id:string | null=null;
     companyId:string='';
     userName:string='';
     name:string='';
     surname:string='';
     email:string='';
     filterRoles:Array<string>=[];
}