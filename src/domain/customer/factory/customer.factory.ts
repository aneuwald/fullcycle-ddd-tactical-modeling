import { v4 as uuid } from "uuid";
import Customer from "../entity/customer";
import Address from "../valueObject/address";

export default class CustomerFactory {

	static create(customerName: string) {
		return new Customer(uuid(), customerName);
	}

	static createWithAddress(customerName: string, street: string, number: number, postalCode: string, city: string) {
		const address = new Address(street, number, postalCode, city);
		const customer = new Customer(uuid(), customerName);
		customer.setAddress(address);

		return customer;
	}
}