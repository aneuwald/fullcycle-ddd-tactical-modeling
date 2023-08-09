export default class OrderItem {
	private _id: string;
	private _productId: string;
	private _name: string;
	private _price: number;
	private _quantity: number = 1;

	constructor(id: string, name: string, price: number, quantity: number, productId: string) {
		this._id = id;
		this._name = name;
		this._price = price;
		this._quantity = quantity;
		this._productId = productId;
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
		if (this._quantity <= 0) {
			throw new Error("Quantity must be greater than 0");
		}
		if (this._productId.length < 3) {
			throw new Error("ProductId must be at least 3 characters long");
		}
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

	get quantity(): number {
		return this._quantity;
	}

	get productId(): string {
		return this._productId;
	}

	public orderItemTotalPrice(): number {
		return this._price * this._quantity;
	}

}