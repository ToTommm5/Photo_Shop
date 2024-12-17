import { Photo } from "./Photo";

export class PanierItem{
    
    photo!:Photo;
    quantity: number =1;
    price:number ;
    size:string ='4*5';


    
    constructor(photo: Photo){
        this.photo = photo;
        this.price = this.photo.price;
    }
    
}