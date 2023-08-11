import { v4 as uuid } from "uuid"
import Order from "../entity/order"
import OrderItem from "../entity/order-item"

export interface OrderFactoryProps {
	customerId: string
	items: Array<{
		name: string
		price: number
		quantity: number
		productId: string
	}>
}

export default class OrderFactory {

	public static create(orderProps: OrderFactoryProps): Order {
		const items = orderProps.items.map(item => new OrderItem(uuid(), item.name, item.price, item.quantity, item.productId))
		return new Order(uuid(), orderProps.customerId, items);
	}

}