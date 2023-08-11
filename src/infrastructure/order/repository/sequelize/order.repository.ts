import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order-item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

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

	async update(entity: Order): Promise<void> {

		const sequelize = OrderModel.sequelize!;

		// Atomic transaction, it means that if any of the operations fail, the whole transaction is rolled back
		await sequelize.transaction(async (t) => {

			// First update the orders table
			await OrderModel.update({
				customer_id: entity.customerId,
				total: entity.total
			}, {
				where: { id: entity.id },
				transaction: t
			})

			// Than remove all items, to ensure there are no orphan OrderItems
			await OrderItemModel.destroy({ where: { order_id: entity.id }, transaction: t })

			// Than add all together again
			// The fact it has the order_id is enough to sequelize to understand they are related
			const itemsToAdd = entity.items.map((item) => ({
				id: item.id,
				name: item.name,
				order_id: entity.id,
				product_id: item.productId,
				quantity: item.quantity,
				price: item.price
			}))

			await OrderItemModel.bulkCreate(itemsToAdd, { transaction: t })

		})

	}

	async deleteById(id: string): Promise<void> {
		await OrderModel.destroy({ where: { id } })
	}

}