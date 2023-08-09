import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {

	private constructCustomerFromModel(customerModel: CustomerModel): Customer {
		const customer = new Customer(customerModel.id, customerModel.name)
		const address = new Address(customerModel.street, customerModel.number, customerModel.postalCode, customerModel.city)
		customer.setAddress(address)
		if (customerModel.active) {
			customer.activate()
		}
		customer.addRewardPoints(customerModel.rewardPoints)
		return customer

	}

	async create(entity: Customer): Promise<void> {
		await CustomerModel.create({
			id: entity.id,
			name: entity.name,
			street: entity.address.street,
			number: entity.address.number,
			city: entity.address.city,
			postalCode: entity.address.postalCode,
			active: entity.isActive,
			rewardPoints: entity.rewardPoints
		})
	}

	async findAll(): Promise<Customer[]> {
		const customerModels = await CustomerModel.findAll()
		return customerModels.map(customerModel => this.constructCustomerFromModel(customerModel))
	}

	async findById(id: string): Promise<Customer | null> {
		const customerModel = await CustomerModel.findOne({ where: { id } })

		if (!customerModel) {
			return null
		}

		return this.constructCustomerFromModel(customerModel)

	}


	async update(entity: Customer): Promise<void> {
		await CustomerModel.update({
			name: entity.name,
			street: entity.address.street,
			number: entity.address.number,
			city: entity.address.city,
			postalCode: entity.address.postalCode,
			active: entity.isActive,
			rewardPoints: entity.rewardPoints
		}, {
			where: { id: entity.id }
		})
	}

	async deleteById(id: string): Promise<void> {
		await CustomerModel.destroy({ where: { id } })
	}




}