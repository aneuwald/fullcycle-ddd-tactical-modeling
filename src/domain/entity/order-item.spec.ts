import OrderItem from "./order-item";

describe('Order unit tests', () => {
	it('should create an instanceof Order with correct parameters', () => {
		const order = new OrderItem("123", "item1", 10, 1, "prod1");
		expect(order instanceof OrderItem).toBeTruthy();
	});

	it('should have all properties', () => {
		const orderItem = new OrderItem("123", "item1", 10, 1, "prod1");
		expect(orderItem.id).toBe('123');
		expect(orderItem.name).toBe('item1');
		expect(orderItem.price).toBe(10);
		expect(orderItem.quantity).toBe(1);
		expect(orderItem.productId).toBe('prod1');
	});

	it('should throw error when ID has less than 3 characters', () => {
		expect(() => {
			new OrderItem("12", "123", 10, 1, "prod1");
		}).toThrowError("Id must be at least 3 characters long");

	})

	it('should throw error when NAME has less than 3 characters', () => {
		expect(() => {
			new OrderItem("123", "12", 10, 1, "prod1");
		}).toThrowError("Name must be at least 3 characters long");
	})

	it('should throw error when PRICE is less than 0', () => {
		expect(() => {
			new OrderItem("123", "123", -1, 1, "prod1");
		}).toThrowError("Price must be greater than 0");
	})

	it('should throw error when QUANTITY is less than 0', () => {
		expect(() => {
			new OrderItem("123", "123", 10, -1, "prod1");
		}).toThrowError("Quantity must be greater than 0");
	})

	it('should throw error when PRODUCT ID has less than 3 characters', () => {
		expect(() => {
			new OrderItem("123", "123", 10, 1, "12");
		}).toThrowError("ProductId must be at least 3 characters long");
	})

	it('should calculate total price', () => {
		const orderItem = new OrderItem("123", "item1", 50, 2, "prod1")
		expect(orderItem.orderItemTotalPrice()).toBe(100);
	})

});