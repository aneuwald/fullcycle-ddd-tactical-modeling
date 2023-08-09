import Order from "./order";
import OrderItem from "./order-item";

describe('Order unit tests', () => {


	it('should throw error when ID has less than 3 characters', () => {
		expect(() => {
			new Order("12", "123", []);
		}).toThrowError("Id must be at least 3 characters long");

	})

	it('should throw error when CUSTOMER ID has less than 3 characters', () => {
		expect(() => {
			new Order("123", "12", []);
		}).toThrowError("CustomerId must be at least 3 characters long");
	})

	it('should throw error when ITEMS is empty', () => {
		expect(() => {
			new Order("123", "123", []);
		}).toThrowError("Order must have at least 1 item");
	})

	it('should calculate total price', () => {
		const item1 = new OrderItem("123", "item1", 10, 2, "prod1")
		const item2 = new OrderItem("345", "item2", 30, 3, "prod1")

		const order = new Order("123", "123", [item1, item2])

		expect(order.total).toBe(110);
	})

})