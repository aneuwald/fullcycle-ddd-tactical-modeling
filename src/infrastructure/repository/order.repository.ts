import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order-item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {

	private constructOrderFromModel(orderModel: OrderModel): Order {
		return new Order(
			orderModel.id,
			orderModel.customer_id,
			orderModel.items.map((item) => new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id))
		)
	}

	async create(entity: Order): Promise<void> {
		await OrderModel.create({
			id: entity.id,
			customer_id: entity.customerId,
			total: entity.total,
			items: entity.items.map((item) => ({
				id: item.id,
				name: item.name,
				order_id: item.id,
				product_id: item.productId,
				quantity: item.quantity,
				price: item.price
			}))
		}, {
			include: [
				{ model: OrderItemModel }
			]
		})
	}


	async findAll(): Promise<Order[]> {
		const orderModels = await OrderModel.findAll({ include: ["items"] })
		return orderModels.map(orderModel => this.constructOrderFromModel(orderModel))
	}

	async findById(id: string): Promise<Order | null> {

		const orderModel = await OrderModel.findOne({ where: { id }, include: ["items"] })

		if (!orderModel) {
			return null
		}

		return this.constructOrderFromModel(orderModel)

	}

	update(entity?: Order): Promise<void> {
		throw new Error("Order can't be updated, only created or deleted");
	}

	async deleteById(id: string): Promise<void> {
		await OrderModel.destroy({ where: { id } })
	}

}