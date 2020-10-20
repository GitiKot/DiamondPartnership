export class createSaleDto {

    readonly id: string;
    readonly date: Date;
    readonly numdate: string;///totaldate
    readonly getchack: boolean;
    readonly InvoiceNumber:Number;//מספר חשבונית
    readonly PublicSerialName:Number;
    readonly PrivateSerialName:Number;
    readonly StoneName:string;
    readonly Weight:Number;
    readonly PricePerCarat:Number;
    readonly TotalPrice:Number;
    readonly RawOrPolished :string;

}