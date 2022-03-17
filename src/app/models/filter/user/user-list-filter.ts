import { PaginationFilter } from "../pagination-filter";

export class UserListFilter extends PaginationFilter{
     companyId:string | null=null;
     userName:string | null=null;
     name:string  | null=null;
     surname:string  | null=null;
     email:string  | null=null;
     filterRoles:Array<string>=[];
     status:boolean | null=null;

     departmentId:string | null =null; 
     positionId:string | null =null; 
     educationId:string | null =null; 
     genderId:string | null =null; 
     experienceId:string | null =null; 
     ageId:string | null =null; 
     categoryId:string | null =null; 
     workTypeId:string | null =null; 
}