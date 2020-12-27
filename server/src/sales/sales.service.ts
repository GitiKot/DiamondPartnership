import { Injectable } from '@nestjs/common';
import { Sales } from './sales.model';
import { createSaleDto } from 'src/sales/dto/create-sale.dto'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { StreamState } from 'http2';
import { pathToFileURL } from 'url';
import { match } from 'assert';
import { Seriousness } from 'src/seriousness/seriousness.model';
import { ObjectID } from 'mongodb';
@Injectable()
export class SalesService {
    constructor(
        @InjectModel('Sale') private readonly salesModel: Model<Sales>,
        @InjectModel('Seriousness') private readonly seriousnessModel: Model<Seriousness>) { }

    async addSale(createSaleDto: createSaleDto): Promise<Sales> {
        const createSale = new this.salesModel(createSaleDto);
        return createSale.save();
    }

    getAllSales(): Sales[] {
        return this.getAllSales();
    }

    async getSales() {
        const Sales = await this.salesModel.find().populate('publicSerialName').exec();
        
        return Sales.map(sale => ({
            id: sale.id,
            date: sale.date,
            numOfDate: sale.numOfDate,
            // getchack: sale.getchack,
            invoiceNumber: sale.invoiceNumber,
            publicSerialName: sale.publicSerialName,
            privateSerialName: sale.privateSerialName,
            stoneName: sale.stoneName,
            weight: sale.weight,
            pricePerCarat: sale.pricePerCarat,
            // TotalPrice: sale.TotalPrice,
            rawOrPolished: sale.rawOrPolished,
            isOpen: sale.isOpen,
        }));
    }
    
    async findBySerailName(serialNameIs: string) { 
        const seriousnessOne =  this.seriousnessModel.findOne({serialName:serialNameIs}).select(['_id']).exec();
    
     const v = (await seriousnessOne)._id;
     
        const SaleBySerailName = await this.salesModel.find({publicSerialName:v}).populate('publicSerialName').exec();
      
        return SaleBySerailName.map(sale => ({
            id: sale.id,
            date: sale.date,
            numOfDate: sale.numOfDate,
            invoiceNumber: sale.invoiceNumber,
            publicSerialName: sale.publicSerialName,
            privateSerialName: sale.privateSerialName,
            stoneName: sale.stoneName,
            weight: sale.weight,
            pricePerCarat: sale.pricePerCarat,
            rawOrPolished: sale.rawOrPolished,
            isOpen: sale.isOpen,
        }));
    }
    // async update(id: string, article: UpdateArticleDto) {
    //     const updatedArticle = this.articleModel.findByIdAndUpdate(id, article, { new: true });
    //     console.log(updatedArticle);
    //     return updatedArticle;
    //   }



    // async updateSale(id: string, createSaleDto: createSaleDto): Promise<Article> {
    //     return await this.saleModel.findByIdAndUpdate(id, createSaleDto);
    //   }

    async updateSale(
        id: string,
        date: Date,
        numOfDate: number,
        invoiceNumber: Number,
        publicSerialName: ObjectID,
        privateSerialName: String,
        stoneName: string,
        weight: Number,
        pricePerCarat: Number,
        rawOrPolished: string,
        isOpen: Boolean,
    ) {
        console.log("sales service update");

        const updatedSale = await this.findSale(id);
        if (date) {
            updatedSale.date = date;
        }
        if (numOfDate) {
            updatedSale.numOfDate = numOfDate;
        }
        if (invoiceNumber) {
            updatedSale.invoiceNumber = invoiceNumber;
        // } if (publicSerialName) {
        //     updatedSale.publicSerialName = publicSerialName;
        }
        if (privateSerialName) {
            updatedSale.privateSerialName = privateSerialName;
        }
        if (stoneName) {
            updatedSale.stoneName = stoneName;
        }
        if (weight) {
            updatedSale.weight = weight;
        }
        if (pricePerCarat) {
            updatedSale.pricePerCarat = pricePerCarat;
        }
        if (rawOrPolished) {
            updatedSale.rawOrPolished = rawOrPolished;
        }
        console.log("isopen");
        console.log(isOpen);
        
        if (isOpen!=null) {
            console.log("in open");
            console.log(updatedSale.isOpen);
            console.log(isOpen);
            
            updatedSale.isOpen = isOpen;
        }

        updatedSale.save();
        console.log("updatesale");
        
        
        return updatedSale;
    }
    async deleteSale(saleId: string) {
        const result = await this.salesModel.deleteOne({ _id: saleId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find Partner.');
        }
    }

    // findAllSales(pn: string): Sales[] {
    //     return this.findAllSales(pn);
    // }
    // async findSales(pn: string) {
    //     const Sales = await this.salesModel.find().exec();
    //     return Sales.map(sale => {
    //         if (sale.publicSerialName == pn) ({
    //             id: sale.id,
    //             date: sale.date,
    //             numOfDate: sale.numOfDate,
    //             // getchack: sale.getchack,
    //             invoiceNumber: sale.invoiceNumber,
    //             publicSerialName: sale.publicSerialName,
    //             privateSerialName: sale.privateSerialName,
    //             stoneName: sale.stoneName,
    //             weight: sale.weight,
    //             pricePerCarat: sale.pricePerCarat,
    //             // TotalPrice: sale.TotalPrice,
    //             rawOrPolished: sale.rawOrPolished,
    //             isOpen: sale.isOpen,
    //         })
    //     });
    // }
    private async findSale(id: string): Promise<Sales> {
        let sale;
        try {
            sale = await this.salesModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find sale.');
        }
        if (!sale) {
            throw new NotFoundException('Could not find sale.');
        }
        return sale;
    }

}
