export class createExpensesDto {
    readonly id: string;
    readonly PublicSerialName: string;
    readonly date: Date;
    readonly getchack: string;
    readonly InvoiceNumber: number;
    readonly detail:Array<{expenses:string,price:number}>;
    readonly Remarks: string;
    readonly amount: number;
    readonly amountPartner: number;
}




