import ProductInterface from "./product.interface";

export default class Product implements ProductInterface {

	private _id: string;
	private _name: string;
	private _price: number;

	constructor(id: string, name: string, price: number) {
		this._id = id;
		this._name = name;
		this._price = price;
		this.validate();
	}

	private validate() {
		if (this._id.length < 3) {
			throw new Error("Id must be at least 3 characters long");
		}
		if (this._name.length < 3) {
			throw new Error("Name must be at least 3 characters long");
		}
		if (this._price <= 0) {
			throw new Error("Price must be greater than 0");
		}
	}

	public changeName(newName: string) {
		this._name = newName;
		this.validate();
	}

	public changePrice(newPrice: number) {
		this._price = newPrice;
		this.validate();
	}


	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get price(): number {
		return this._price;
	}

}