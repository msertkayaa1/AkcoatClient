import { Base } from "./base";
import { Pages } from "./pages";

export class Permission extends  Base{
     companyId:string='';
     pageRolesId:string='';
     pagesId:string='';
     isPermission:boolean=false;
     pages:Pages=new Pages();
   
}