import Product from "../entity/product";
import { v4 as uuid } from 'uuid';
import ProductB from "../entity/product-b";

export default class ProductFactory {

	public static create(type: string, productName: string, price: number): any {
		switch (type) {
			case 'A':
				return new Product(uuid(), productName, price);
			case 'B':
				return new ProductB(uuid(), productName, price);
			default:
				throw new Error('Event type not found');
		}
	}

}