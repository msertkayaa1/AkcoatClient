import { combineAll } from "rxjs/operators";
import { Base } from "../../base";
import { Company } from "../../company";
import { Permission } from "../../permission";

export class ApplicationUser{
    id:string='';
    name:string ='' 

    surname:string ='' 
    phone:string ='' 
    imageUrl:string ='' 
    userType:number=0;
    birthFullDate:Date=new Date();
    updateDate:Date=new Date();
    createDate:Date=new Date();
    companyId:string ='' 
    company:Company | null=null;
    confirmCode:string ='' 

    playerId:string ='' 
    status:boolean= true;

    permissions:Array<Permission>=[];

}