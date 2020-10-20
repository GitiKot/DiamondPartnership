import { Injectable } from '@nestjs/common';
import { Sale } from './sales.model';
import{createSaleDto}from 'src/sales/dto/create-sale.dto'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class SalesService {
    constructor(
        @InjectModel('Sale') private readonly salesModel: Model<Sale>,){}
        
    async addSale(createSaleDto: createSaleDto): Promise<Sale> {
        const createSale = new this.salesModel(createSaleDto);
        return createSale.save();
    }
    
      getAllSales(): Sale[] {
        return this.getAllSales();
      }
      async getSales() {
        const Sales = await this.salesModel.find().exec();
        return Sales.map(sale => ({
            id: sale.id,
            date: sale.date,
            numdate: sale.numdate,
            getchack: sale.getchack,
            InvoiceNumber: sale.InvoiceNumber,
            PublicSerialName: sale.PublicSerialName,
            PrivateSerialName: sale.PrivateSerialName,
            StoneName: sale.StoneName,
            Weight: sale.Weight,
            PricePerCarat: sale.PricePerCarat,
            TotalPrice: sale.TotalPrice,
            RawOrPolished: sale.RawOrPolished,
        }));
    }

}
