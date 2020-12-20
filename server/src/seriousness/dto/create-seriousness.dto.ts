import { ObjectID } from "mongodb";
import { Partner } from "src/partners/interfaces/partners.interface";

export class createSeriousnessDto {
    readonly id: string;
    readonly serialName: string;//Aששם סריה
    readonly partner:ObjectID ;//שם שותף
    readonly dateBuy: Date;//תאריךקניה
   readonly privateSeria:Array<{namePrivate:string,price:number,expenses:Array<{nameExpenses:string,price:number}>}>;
    readonly cost: number;//סה"כ מחיר קניה +הוצאות
    readonly amountReceived: number;//סכום שהתקבל
    readonly partnersPercent: number;//אחוזים לשותף
    readonly AmountReceivedPartner: number;//סכום שהשותף קיבל=
    readonly finishDate: Date;//תאריך סגירת סריה


    

    
}


