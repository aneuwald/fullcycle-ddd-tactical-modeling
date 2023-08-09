import { Sequelize } from "sequelize-typescript"
import OrderModel from "../db/sequelize/model/order.model"
import OrderItemModel from "../db/sequelize/model/order-item.model"
import ProductModel from "../db/sequelize/model/product.model"
import CustomerRepository from "./customer.repository"
import Customer from "../../domain/entity/customer"
import Address from "../../domain/entity/address"
import ProductRepository from "./product.repository"
import Product from "../../domain/entity/product"
import OrderItem from "../../domain/entity/order-item"
import Order from "../../domain/entity/order"
import OrderRepository from "./order.repository"
import CustomerModel from "../db/sequelize/model/customer.model"

describe('Order repository unit tests', () => {

	let sequelize: Sequelize

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			models: [CustomerModel, ProductModel, OrderModel, OrderItemModel],
			logging: false,
			sync: { force: true }
		})
		await sequelize.sync()
	})

	afterEach(async () => {
		await sequelize.close()
	})

	it('should create an order', async () => {

		const customerRepository = new CustomerRepository()
		const customer = new Customer('customer1', "Customer 1")
		const address = new Address("Street 1", 10, "City 1", "12345678")
		customer.setAddress(address)
		await customerRepository.create(customer)

		const productRepository = new ProductRepository();
		const product = new Product('product1', "Product 1", 100);
		await productRepository.create(product);

		const orderItem = new OrderItem("orderItem1", product.name, product.price, 2, product.id);

		const orderRepository = new OrderRepository();
		const order = new Order("order1", customer.id, [orderItem]);
		await orderRepository.create(order);

		const orderModel = await OrderModel.findOne({
			where: { id: order.id },
			include: ["items"]
		})

		expect(orderModel?.toJSON()).toStrictEqual({
			id: order.id,
			customer_id: customer.id,
			total: order.total,
			items: [{
				id: orderItem.id,
				name: orderItem.name,
				price: orderItem.price,
				quantity: orderItem.quantity,
				product_id: product.id,
				order_id: order.id
			}]
		})

	})

	it('should find all orders', async () => {

		const customerRepository = new CustomerRepository()
		const customer = new Customer('customer1', "Customer 1")
		const address = new Address("Street 1", 10, "City 1", "12345678")
		customer.setAddress(address)
		await customerRepository.create(customer)

		const productRepository = new ProductRepository();
		const product = new Product('product1', "Product 1", 100);
		await productRepository.create(product);

		const orderItem = new OrderItem("orderItem1", product.name, product.price, 2, product.id);

		const orderRepository = new OrderRepository();
		const order = new Order("order1", customer.id, [orderItem]);
		await orderRepository.create(order);

		const orders = await orderRepository.findAll()

		expect(orders).toStrictEqual([order])


	})

	it('should find an order by id', async () => {

		const customerRepository = new CustomerRepository()
		const customer = new Customer('customer1', "Customer 1")
		const address = new Address("Street 1", 10, "City 1", "12345678")
		customer.setAddress(address)
		await customerRepository.create(customer)

		const productRepository = new ProductRepository();
		const product = new Product('product1', "Product 1", 100);
		await productRepository.create(product);

		const orderItem = new OrderItem("orderItem1", product.name, product.price, 2, product.id);

		const orderRepository = new OrderRepository();
		const order = new Order("order1", customer.id, [orderItem]);
		await orderRepository.create(order);

		const orderFound = await orderRepository.findById(order.id)

		expect(orderFound).toStrictEqual(order)

	})

	it('should return null when try to find an order by id that does not exist', async () => {

		const orderRepository = new OrderRepository();
		const orderFound = await orderRepository.findById("order1")

		expect(orderFound).toBeNull()

	})

	it('should throw an error when try to update an order', async () => {

		const customerRepository = new CustomerRepository()
		const customer = new Customer('customer1', "Customer 1")
		const address = new Address("Street 1", 10, "City 1", "12345678")
		customer.setAddress(address)
		await customerRepository.create(customer)

		const productRepository = new ProductRepository();
		const product = new Product('product1', "Product 1", 100);
		await productRepository.create(product);

		const orderItem = new OrderItem("orderItem1", product.name, product.price, 2, product.id);

		const orderRepository = new OrderRepository();
		const order = new Order("order1", customer.id, [orderItem]);
		await orderRepository.create(order);

		const orderItemUpdated = new OrderItem("orderItem1", product.name, product.price, 3, product.id);
		const orderUpdated = new Order("order1", customer.id, [orderItemUpdated]);

		expect(() => {
			orderRepository.update(orderUpdated)
		}).toThrowError("Order can't be updated, only created or deleted")

	})

	it('should delete an order', async () => {

		const customerRepository = new CustomerRepository()
		const customer = new Customer('customer1', "Customer 1")
		const address = new Address("Street 1", 10, "City 1", "12345678")
		customer.setAddress(address)
		await customerRepository.create(customer)

		const productRepository = new ProductRepository();
		const product = new Product('product1', "Product 1", 100);
		await productRepository.create(product);

		const orderItem = new OrderItem("orderItem1", product.name, product.price, 2, product.id);

		const orderRepository = new OrderRepository();
		const order = new Order("order1", customer.id, [orderItem]);
		await orderRepository.create(order);

		const orderFromRepository = await orderRepository.findById(order.id)
		expect(orderFromRepository).toStrictEqual(order)

		await orderRepository.deleteById(order.id)

		const orderModel = await OrderModel.findOne({
			where: { id: order.id },
			include: ["items"]
		})

		expect(orderModel).toBeNull()

	})

	it('should return correct customer on order', async () => {

		const customerRepository = new CustomerRepository()
		const customer = new Customer('customer1', "Customer 1")
		const address = new Address("Street 1", 10, "City 1", "12345678")
		customer.setAddress(address)
		await customerRepository.create(customer)

		const productRepository = new ProductRepository();
		const product = new Product('product1', "Product 1", 100);
		await productRepository.create(product);

		const orderItem = new OrderItem("orderItem1", product.name, product.price, 2, product.id);

		const orderRepository = new OrderRepository();
		const order = new Order("order1", customer.id, [orderItem]);
		await orderRepository.create(order);

		const orderModel = await OrderModel.findOne({
			where: { id: order.id },
			include: ["items", "customer"]
		})

		expect(orderModel?.customer.toJSON()).toStrictEqual({
			active: false,
			city: "12345678",
			id: "customer1",
			name: "Customer 1",
			number: 10,
			postalCode: "City 1",
			rewardPoints: 0,
			street: "Street 1",
		})

	})

})