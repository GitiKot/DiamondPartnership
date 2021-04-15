export class Email {
    id: string;
    recipientsEmail:string
    ;

    constructor(re?:string) {
        this.recipientsEmail=re;
    }
}