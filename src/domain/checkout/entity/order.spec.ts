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

	it('should change customer', () => {

		const item1 = new OrderItem("123", "item1", 10, 2, "prod1")

		const order = new Order("123", "customer_id1", [item1])

		expect(order.customerId).toBe("customer_id1");

		order.changeCustomer("customer_id2");

		expect(order.customerId).toBe("customer_id2");

	})

	it('should add item', () => {
		const item1 = new OrderItem("123", "item1", 10, 2, "prod1")

		const order = new Order("123", "customer_id1", [item1])

		expect(order.items).toStrictEqual([item1]);
		expect(order.total).toBe(20);

		const item2 = new OrderItem("345", "item2", 30, 3, "prod1")
		order.addItem(item2);

		expect(order.items).toStrictEqual([item1, item2]);
		expect(order.total).toBe(110);

		const item3 = new OrderItem("567", "item3", 30, 3, "prod1")
		order.addItem(item3);

		expect(order.items).toStrictEqual([item1, item2, item3]);
		expect(order.total).toBe(200);

	})

})