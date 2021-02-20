export class Companies {
    id: string;
    nameCompany: string;
    password: string;

    constructor(nc?: string, p?: string) {
        this.nameCompany = nc;
        this.password = p;
      
    }
}