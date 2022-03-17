import { Base } from "./base";

export class Company  {
    id:string | null=null;
    companyName:string='';
    maxSurveyCount:number=0;
    maxUserCount:number=0;
    defaultSurveyCount:number=0;
    defaultUserCount:number=0;
    imagePath:string='';
    updateDate:Date=new Date();
    createDate:Date=new Date();
    status:boolean=false;
}