
    export class User{
    id: string;
    dateStart: Date;
    password: string;
    AllowingAccess  : string;    
    constructor(i:string,d:Date,p:string,a:string){
        this.id=i;
        this.dateStart=d;
        this.password=p;
        this.AllowingAccess=a;
    }
    }