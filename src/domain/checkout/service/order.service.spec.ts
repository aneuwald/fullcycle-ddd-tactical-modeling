import Customer from "../../customer/entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/order-item"
import OrderService from "./order.service"

describe('Order service unit tests', () => {

	it('should throw error when placing an order with no items', () => {
		const customer = new Customer('cust1', "Customer 1")
		const orderItems: OrderItem[] = []
		expect(() => {
			OrderService.placeOrder(customer, orderItems)
		}).toThrowError("Order must have at least one item")

	})

	it('should place an order', () => {
		const customer = new Customer('cust1', "Customer 1")
		const orderItem1 = new OrderItem('orderItem1', "Order Item 1", 100, 2, "prod1")
		const orderItem2 = new OrderItem('orderItem2', "Order Item 2", 200, 1, "prod2")
		const orderItems = [orderItem1, orderItem2]

		const order = OrderService.placeOrder(customer, orderItems)

		expect(customer.rewardPoints).toEqual(200)
		expect(order.total).toBe(400)
	})

	it('should get total of all orders', () => {

		const orderItem1 = new OrderItem('orderItem1', "Order Item 1", 100, 2, "prod1")
		const orderItem2 = new OrderItem('orderItem2', "Order Item 2", 200, 1, "prod2")
		const orderItem3 = new OrderItem('orderItem3', "Order Item 3", 300, 3, "prod3")
		const orderItems = [orderItem1, orderItem2, orderItem3]

		const order1 = new Order('order1', "Order 1", orderItems)
		const order2 = new Order('order2', "Order 2", orderItems)

		const total = OrderService.getTotal([order1, order2])

		expect(total).toEqual(2600);


	})

})