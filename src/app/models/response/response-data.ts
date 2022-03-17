export interface ResponseData<T> {
    
     succeeded:boolean;
     message:string;
     errors:Array<string>;
     data:T
}