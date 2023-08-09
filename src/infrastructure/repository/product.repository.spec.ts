import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product.model"
import Product from "../../domain/entity/product"
import ProductRepository from "./product.repository"

describe('Product repository unit tests', () => {

	let sequelize: Sequelize

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			models: [ProductModel],
			logging: false,
			sync: { force: true }
		})
		await sequelize.sync()
	})

	afterEach(async () => {
		await sequelize.close()
	})

	it('should create a product', async () => {

		const productRepository = new ProductRepository()
		const product = new Product('prod1', "Product 1", 10)

		await productRepository.create(product)

		const productModel = await ProductModel.findOne({ where: { id: 'prod1' } })

		expect(productModel?.toJSON()).toStrictEqual({
			id: "prod1",
			name: "Product 1",
			price: 10
		})

	})

	it('should update a product', async () => {
		const productRepository = new ProductRepository()
		const product = new Product('prod1', "Product 1", 10)

		await productRepository.create(product)

		const productModel = await ProductModel.findOne({ where: { id: 'prod1' } })

		expect(productModel?.toJSON()).toStrictEqual({
			id: "prod1",
			name: "Product 1",
			price: 10
		})

		product.changeName("Product 1 updated")
		product.changePrice(20)

		await productRepository.update(product)

		const productModelUpdated = await ProductModel.findOne({ where: { id: 'prod1' } })

		expect(productModelUpdated?.toJSON()).toStrictEqual({
			id: "prod1",
			name: "Product 1 updated",
			price: 20
		})
	})

	it('should find a product by id', async () => {
		const productRepository = new ProductRepository()
		const product = new Product('prod1', "Product 1", 10)

		await productRepository.create(product)

		const foundProductModel = await ProductModel.findOne({ where: { id: 'prod1' } })
		const foundProductRepository = await productRepository.findById('prod1')

		expect({
			id: foundProductRepository?.id,
			name: foundProductRepository?.name,
			price: foundProductRepository?.price
		}).toStrictEqual(foundProductModel?.toJSON())
	})

	it('should return null when product is not found by id', async () => {
		const productRepository = new ProductRepository()
		const foundProductRepository = await productRepository.findById('anythingwitherror')
		expect(foundProductRepository).toBeNull()
	})

	it('should find all products', async () => {
		const productRepository = new ProductRepository()

		const product1 = new Product('prod1', "Product 1", 10)
		await productRepository.create(product1)

		const product2 = new Product('prod2', "Product 2", 20)
		await productRepository.create(product2)

		const foundProductsRepository = await productRepository.findAll()
		const products = [product1, product2]

		expect(foundProductsRepository).toEqual(products)
	})

	it('shoud find by name', async () => {
		const productRepository = new ProductRepository()

		const product1 = new Product('prod1', "Product 1", 10)
		await productRepository.create(product1)

		const product2 = new Product('prod2', "Product 2", 20)
		await productRepository.create(product2)

		const foundProductsRepository = await productRepository.findByName('Product 1')

		expect(foundProductsRepository).toStrictEqual(product1)

	})

	it('should return null when product is not found by name', async () => {

		const productRepository = new ProductRepository()

		const product1 = new Product('prod1', "Product 1", 10)
		await productRepository.create(product1)

		const product2 = new Product('prod2', "Product 2", 20)
		await productRepository.create(product2)

		const foundProductsRepository = await productRepository.findByName('Product 3')

		expect(foundProductsRepository).toBeNull()


	})


	it('should delete a product', async () => {

		const productRepository = new ProductRepository()
		const product = new Product('prod1', "Product 1", 10)

		await productRepository.create(product)

		const productModel = await productRepository.findById(product.id)

		expect(productModel).toStrictEqual(product)

		await productRepository.deleteById(product.id)

		const productModelDeleted = await productRepository.findById(product.id)

		expect(productModelDeleted).toBeNull()

	})

})