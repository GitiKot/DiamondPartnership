
export class User {
    id:string;
    userName:string;
//    email:string;
   password:string;

    constructor(id:string, userName:string,
       
        password:string, ) {
        this.id=id;
        // this.email=email; email:string,
        this.userName=userName;
        this.password=password;
    }
}