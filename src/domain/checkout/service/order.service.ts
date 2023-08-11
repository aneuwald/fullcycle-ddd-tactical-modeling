import Customer from "../../customer/entity/customer";
import { v4 as uuid } from "uuid";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";

export default class OrderService {

	static getTotal(orders: Order[]) {
		let total = 0
		orders.forEach(order => {
			total += order.total;
		})
		return total
	}

	static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {

		if (orderItems.length === 0) {
			throw new Error("Order must have at least one item")
		}

		const order = new Order(uuid(), customer.id, orderItems)
		customer.addRewardPoints(order.total / 2)
		return order
	}

}