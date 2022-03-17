import { Company } from "./company";
import { Permission } from "./permission";

export class AuthenticateResponse{
    userId:string='';
    userName:string='';
    name:string='';
    surname:string=''
    token:string='';
    expiration:Date=new Date();
    companyId:string='';
    company:Company=new Company();
    roles:Array<string>=[];
    isStatics:boolean=false;
    isLeaderStatics:boolean=false;
    offerRight:number=0;
    playerId:string='';
    permissions:Array<Permission>=[];
}