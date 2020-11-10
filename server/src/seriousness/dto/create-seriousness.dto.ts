import { Partner } from "src/partners/interfaces/partners.interface";

export class createSeriousnessDto {
    readonly id: string;
    readonly SerialName: string;//Aששם סריה
    readonly partnerId: Partner;//שם שותף
    readonly dateBuy: Date;//תאריךקניה
    readonly privateSeria: number;//   סריה פרטית מערךאו אוביקט שכווללים גם מחירים לכל סריה פרטית
    readonly expenses: number;//הוצאות מטיפוס אובקט או מטיפוס מערך
    readonly cost: number;//סה"כ מחיר קניה +הוצאות
    readonly amountReceived: number;//סכום שהתקבל
    readonly partnersPercent: string;//אחוזים לשותף
    readonly AmountReceivedPartner: number;//סכום שהשותף קיבל=
    readonly finishDate: Date;//תאריך סגירת סריה

}


