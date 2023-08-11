import CustomerFactory from "./customer.factory";

describe('Customer factory unit tests', () => {

	it('should create a customer with valid name', () => {

		const customer = CustomerFactory.create("John Doe");

		expect(customer).toBeDefined();
		expect(customer.id).toBeDefined();
		expect(customer.name).toBe("John Doe");
		expect(customer.isActive).toBeFalsy();
		expect(customer.address).toBeUndefined();

	})

	it('should create a customer with valid name and address', () => {

		const customer = CustomerFactory.createWithAddress("John Doe", "Street 1", 123, "1231513", "Lisbon");

		expect(customer).toBeDefined();
		expect(customer.id).toBeDefined();
		expect(customer.name).toBe("John Doe");
		expect(customer.isActive).toBeFalsy();
		expect(customer.address).toBeDefined();
		expect(customer.address?.street).toBe("Street 1");
		expect(customer.address?.number).toBe(123);
		expect(customer.address?.postalCode).toBe("1231513");
		expect(customer.address?.city).toBe("Lisbon");
	})

})