import { PageRoles } from "../page-roles";
import { Permission } from "../permission";

export class RolePermissionResponse{
    pageRoles:PageRoles;
    permissions:Array<Permission>=[];
  
}