import { AuthenticateResponse } from "../authenticate-response";
import { Permission } from "../permission";

export class LoginMFAResponse{
    email:string='';
    isMfa:boolean=true;
    authResponse:AuthenticateResponse=new AuthenticateResponse();

}