import { v4 as uuid } from "uuid";
import OrderFactory, { OrderFactoryProps } from "./order.factory";
import CustomerFactory from "../../customer/factory/customer.factory";

describe('Order factory unit tests', () => {

	it('should create an order with valid data', () => {

		const customer = CustomerFactory.create("John Doe");

		const orderProps: OrderFactoryProps = {
			customerId: customer.id,
			items: [{
				name: "item1",
				price: 10,
				quantity: 2,
				productId: uuid()
			}]
		}

		const order = OrderFactory.create(orderProps);

		expect(order).toBeDefined();
		expect(order.id).toBeDefined();
		expect(order.customerId).toBe(customer.id);
		expect(order.items[0].name).toStrictEqual(orderProps.items[0].name);
		expect(order.items[0].price).toStrictEqual(orderProps.items[0].price);
		expect(order.items[0].quantity).toStrictEqual(orderProps.items[0].quantity);
		expect(order.items[0].productId).toStrictEqual(orderProps.items[0].productId);
		expect(order.items.length).toBe(1);
		expect(order.total).toBe(20);



	})

})