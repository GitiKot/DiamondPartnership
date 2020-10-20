export class Partner {
    id: string;
    name: string;
    email: string;
    contact:string;
    phone: string;
    pel:string;
    fax:string;
    Remarks:string;
    constructor( n?: string, e?: string, p?: string,nc?:string,pel?:string,f?:string,r?:string) {
        this.name = n;
        this.email = e;
        this.phone = p;
        this.contact=nc;
        this.pel=pel;
        this.fax=f;
        this.Remarks=r;
    }
}
