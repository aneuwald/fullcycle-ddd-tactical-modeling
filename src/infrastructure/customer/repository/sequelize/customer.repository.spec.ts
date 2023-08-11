import { Sequelize } from "sequelize-typescript"
import CustomerRepository from "./customer.repository"
import CustomerModel from "./customer.model"
import Customer from "../../../../domain/customer/entity/customer"
import Address from "../../../../domain/customer/valueObject/address"


describe('Customer repository unit tests', () => {

	let sequelize: Sequelize

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			models: [CustomerModel],
			logging: false,
			sync: { force: true }
		})
		await sequelize.sync()
	})

	afterEach(async () => {
		await sequelize.close()
	})

	it('should create a customer', async () => {

		const customerRepository = new CustomerRepository()
		const customer = new Customer('customer1', "Customer 1")
		const address = new Address("Street 1", 10, "City 1", "12345678")
		customer.setAddress(address)
		await customerRepository.create(customer)

		const customerModel = await CustomerModel.findOne({ where: { id: 'customer1' } })

		expect(customerModel?.toJSON()).toStrictEqual({
			id: customer.id,
			name: customer.name,
			active: customer.isActive,
			rewardPoints: customer.rewardPoints,
			street: customer.address.street,
			number: customer.address.number,
			postalCode: customer.address.postalCode,
			city: customer.address.city
		})

	})

	it('should update a customer', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer('customer1', "Customer 1");
		const address = new Address("Street 1", 10, "City 1", "12345678");
		customer.setAddress(address);
		customer.activate();
		await customerRepository.create(customer);

		const customerModel = await CustomerModel.findOne({ where: { id: 'customer1' } })

		expect(customerModel?.toJSON()).toStrictEqual({
			id: customer.id,
			name: customer.name,
			active: customer.isActive,
			rewardPoints: customer.rewardPoints,
			street: customer.address.street,
			number: customer.address.number,
			postalCode: customer.address.postalCode,
			city: customer.address.city
		})

		customer.changeName("Customer 1 updated");
		customer.addRewardPoints(100);
		customer.deactivate();
		const address2 = new Address("Street 2", 20, "City 2", "987654321");
		customer.setAddress(address2);

		await customerRepository.update(customer);

		const customerModel2 = await customerRepository.findById('customer1')

		expect(customerModel2).toStrictEqual(customer)

	})

	it('should find a customer by id', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer('customer1', "Customer 1");
		const address = new Address("Street 1", 10, "City 1", "12345678");
		customer.setAddress(address);
		await customerRepository.create(customer);

		const foundCustomerModel = await customerRepository.findById('customer1')

		expect(customer).toStrictEqual(foundCustomerModel)
	})

	it('should return null when product is not found by id', async () => {
		const customerRepository = new CustomerRepository()
		const foundCustomerRepository = await customerRepository.findById('anythingwitherror')
		expect(foundCustomerRepository).toBeNull()
	})

	it('should find all customers', async () => {
		const customerRepository = new CustomerRepository()

		const customer1 = new Customer('customer1', "Customer 1")
		const address = new Address("Street 1", 10, "City 1", "12345678");
		customer1.setAddress(address);
		await customerRepository.create(customer1)

		const customer2 = new Customer('customer2', "Customer 2")
		const address2 = new Address("Street 2", 20, "City 2", "987654321");
		customer2.setAddress(address2);
		customer2.activate();
		await customerRepository.create(customer2)

		const foundCustomersRepository = await customerRepository.findAll()

		const customers = [customer1, customer2]

		expect(foundCustomersRepository).toEqual(customers)
	})



	it('should delete a customer', async () => {

		const customerRepository = new CustomerRepository()
		const customer = new Customer('customer1', "Customer 1")
		const address = new Address("Street 1", 10, "City 1", "12345678")

		customer.setAddress(address)

		await customerRepository.create(customer)

		const customerModel = await CustomerModel.findOne({ where: { id: 'customer1' } })

		expect(customerModel).toBeDefined()

		await customerRepository.deleteById(customer.id)

		const customerModelDeleted = await customerRepository.findById(customer.id)

		expect(customerModelDeleted).toBeNull()

	})

})