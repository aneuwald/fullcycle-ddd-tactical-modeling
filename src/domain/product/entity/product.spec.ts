import Product from "./product";

describe('Product unit tests', () => {

	it('should create an instanceof Product with correct parameters', () => {
		const product1 = new Product("123", "product1", 100);
		expect(product1 instanceof Product).toBeTruthy();
	})

	it('should have properties', () => {
		const product1 = new Product("123", "product1", 100);
		expect(product1.id).toBe('123');
		expect(product1.name).toBe('product1');
		expect(product1.price).toBe(100);
	})

	it('should throw error when ID has less than 3 characters', () => {
		expect(() => {
			new Product("12", "123", 100);
		}).toThrowError("Id must be at least 3 characters long");
	})

	it('should throw error when NAME has less than 3 characters', () => {
		expect(() => {
			new Product("123", "12", 100);
		}).toThrowError("Name must be at least 3 characters long");
	})

	it('should throw error when PRICE is less than 0', () => {
		expect(() => {
			new Product("123", "123", -1);
		}).toThrowError("Price must be greater than 0");
	})

	it('should change price', () => {
		const product1 = new Product("123", "product1", 100);
		expect(product1.price).toBe(100);
		product1.changePrice(200);
		expect(product1.price).toBe(200);
	})



})