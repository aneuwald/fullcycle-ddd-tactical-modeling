import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../customer/repository/sequelize/customer.model"
import ProductModel from "../../../product/repository/sequelize/product.model"
import OrderModel from "./order.model"
import OrderItemModel from "./order-item.model"
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository"
import Address from "../../../../domain/customer/valueObject/address"
import Customer from "../../../../domain/customer/entity/customer"
import ProductRepository from "../../../product/repository/sequelize/product.repository"
import Product from "../../../../domain/product/entity/product"
import OrderItem from "../../../../domain/checkout/entity/order-item"
import OrderRepository from "./order.repository"
import Order from "../../../../domain/checkout/entity/order"

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

	it('should update an order', async () => {

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

		const orderItem2 = new OrderItem("orderItem2", product.name, product.price, 3, product.id);
		order.addItem(orderItem2)
		const customer2 = new Customer('customer2', "Customer 2")
		const address2 = new Address("Street 2", 20, "City 2", "87654321")
		customer2.setAddress(address2)
		await customerRepository.create(customer2)

		order.changeCustomer(customer2.id)

		await orderRepository.update(order)

		const orderModel = await orderRepository.findById(order.id)

		expect(orderModel?.customerId).toStrictEqual(customer2.id)
		expect(orderModel?.total).toStrictEqual(order.total)
		expect(orderModel?.items).toHaveLength(2)
		expect(orderModel?.items).toStrictEqual([orderItem, orderItem2])
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

	it('should return correct customerId on order', async () => {

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

		const orderModel = await orderRepository.findById(order.id);

		expect(orderModel?.customerId).toBe(customer.id)

	})

})