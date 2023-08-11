import Address from "../valueObject/address";
import Customer from "./customer";


describe('Customer unit tests', () => {

	it('should throw error when ID has less than 3 characters', () => {
		expect(() => {
			new Customer("12", "John Doe");
		}).toThrowError("Id must be at least 3 characters long");
	});

	it('should throw error when NAME has less than 3 characters', () => {
		expect(() => {
			new Customer("123", "Jo");
		}).toThrowError("Name must be at least 3 characters long");
	});

	it('should create a customer with valid data', () => {
		const customer = new Customer("123", "John Doe");
		expect(customer).toBeDefined();
	})

	it('should change name with success', () => {
		const customer = new Customer("123", "John Doe");
		expect(customer.name).toBe("John Doe");
		customer.changeName("John Doe 2");
		expect(customer.name).toBe("John Doe 2");
	})

	it('should throw error when changing name to less than 3 characters', () => {
		const customer = new Customer("123", "John Doe");
		expect(customer.name).toBe("John Doe");
		expect(() => {
			customer.changeName("Jo");
		}).toThrowError("Name must be at least 3 characters long");
	})

	it('should set address with success', () => {
		const customer = new Customer("123", "John Doe");
		const address = new Address("Street 1", 123, "1231513", "Lisbon");
		customer.setAddress(address);
		expect(customer.address).toBeDefined();
	})

	it('should activate and deactivate customer', () => {
		const customer = new Customer("123", "John Doe");
		const address = new Address("Street 1", 123, "1231513", "Lisbon");
		customer.setAddress(address);

		customer.activate();
		expect(customer.isActive).toBeTruthy();

		customer.deactivate();
		expect(customer.isActive).toBeFalsy();
	})

	it('should throw error when activating customer without address', () => {
		const customer = new Customer("123", "John Doe");
		expect(() => {
			customer.activate();
		}).toThrowError("Address is required to activate customer");
	})

	it('should add reward points with success', () => {
		const customer = new Customer("123", "John Doe");
		expect(customer.rewardPoints).toBe(0);
		customer.addRewardPoints(100);
		expect(customer.rewardPoints).toBe(100);
		customer.addRewardPoints(150);
		expect(customer.rewardPoints).toBe(250);
	})


})