import ProductFactory from "./product.factory"

describe('Product factory unit test', () => {

	it('should create a product type A', () => {

		const product = ProductFactory.create("A", "Product 1", 10)

		expect(product.id).toBeDefined()
		expect(product.name).toBe('Product 1')
		expect(product.price).toBe(10)
		expect(product.constructor.name).toBe("Product")

	})

	it('should create a product type A', () => {

		const product = ProductFactory.create("B", "Product 2", 20)

		expect(product.id).toBeDefined()
		expect(product.name).toBe('Product 2')
		expect(product.price).toBe(40)
		expect(product.constructor.name).toBe("ProductB")

	})

	it('should throw an error when type is not found', () => {

		expect(() => {
			ProductFactory.create("C", "Product 3", 30)
		}).toThrowError('Event type not found')

	})

})