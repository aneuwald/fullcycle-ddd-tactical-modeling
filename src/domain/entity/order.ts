import OrderItem from "./order-item";

export default class Order {

	private _id: string;
	private _customerId: string;
	private _items: OrderItem[] = [];
	private _total: number;

	constructor(id: string, customerId: string, items: OrderItem[]) {
		this._id = id;
		this._customerId = customerId;
		this._items = items;
		this._total = this.calculateTotal();
		this.validate();
	}

	private validate() {
		if (this._id.length < 3) {
			throw new Error("Id must be at least 3 characters long");
		}
		if (this._customerId.length < 3) {
			throw new Error("CustomerId must be at least 3 characters long");
		}
		if (this._items.length < 1) {
			throw new Error("Order must have at least 1 item");
		}
	}

	private calculateTotal() {
		return this._items.reduce((total, item) => total + item.orderItemTotalPrice(), 0);
	}

	get id() {
		return this._id;
	}

	get customerId() {
		return this._customerId;
	}

	get items() {
		return this._items;
	}

	get total() {
		return this._total;
	}

}