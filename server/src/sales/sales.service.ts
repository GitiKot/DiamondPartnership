import { Injectable, NotFoundException } from '@nestjs/common';
// import { Sale } from './sales.model';
import {Sale} from './interface/sales.interface'
import { createSaleDto } from 'src/sales/dto/create-sale.dto'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SalesService {
    constructor(
        @InjectModel('Sale') private readonly salesModel: Model<Sale>,) { }

    async addSale(createSaleDto: createSaleDto): Promise<Sale> {
        const createSale = new this.salesModel(createSaleDto);
        return createSale.save();
    }

    // getAllSales(): Sale[] {
    //     return this.getAllSales();
    // }
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
    async getSingleSale(SaleId: string) {
        const Sale = await this.findSale(SaleId);
        return {
            id: Sale.id,
            date: Sale.date,
            numdate: Sale.numdate,
            getchack: Sale.getchack,
            InvoiceNumber: Sale.InvoiceNumber,
            PublicSerialName: Sale.PublicSerialName,
            PrivateSerialNam: Sale.PrivateSerialName,
            StoneName: Sale.StoneName,
            PricePerCarat: Sale.PricePerCarat,
            Weight: Sale.Weight,
            TotalPrice: Sale.TotalPrice,
            RawOrPolished: Sale.RawOrPolished,

        };
    }
    private async findSale(id: string): Promise<Sale> {
        let sale;
        try {
            sale = await this.salesModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find Partner.');
        }
        if (!sale) {
            throw new NotFoundException('Could not find Partner.');
        }
        return sale;
    }
}
///////////

//     async updatePartner(
//         id: string,
//         name: string,
//         contact: string,
//         email: string,
//         phone: string,
//         fax: string,
//         pel: string,
//         Remarks: string,
//     ) {
//         const updatedPartner = await this.findPartner(id);
//         if (name) {
//             updatedPartner.name = name;
//         }
//         if (contact) {
//             updatedPartner.contact = contact;
//         }
//         if (email) {
//             updatedPartner.email = email;
//         } if (phone) {
//             updatedPartner.phone = phone;
//         }
//         if (fax) {
//             updatedPartner.fax = fax;
//         }
//         if (pel) {
//             updatedPartner.pel = pel;
//         }
//         if (Remarks) {
//             updatedPartner.Remarks = Remarks;
//         }
//         updatedPartner.save();
//     }

//     async deletePartner(prodId: string) {
//         const result = await this.partnersModel.deleteOne({ _id: prodId }).exec();
//         if (result.n === 0) {
//             throw new NotFoundException('Could not find Partner.');
//         }
//     }

//   
// }


