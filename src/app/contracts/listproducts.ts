import { ListProductImages } from "./listproductimages";

export class ListProducts{
    id:string;
    name:string;
    unitInStock:number;
    price:number;
    createdDate:Date;
    updatedDate:Date;
    productImageFiles:ListProductImages[];
    imagePath:string;
}