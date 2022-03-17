import { Offer } from "../offer";
import { OfferCategory } from "../offer-category";

export class OfferCategoryDto{
    offer:Offer;
    categorys:Array<string>=[];
}