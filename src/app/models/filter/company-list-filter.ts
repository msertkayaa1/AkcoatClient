import { PaginationFilter } from "./pagination-filter";

export class CompanyListFilter extends PaginationFilter{
    companyName:string='';
    status:boolean | null=null;
}