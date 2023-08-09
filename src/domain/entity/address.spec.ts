import Address from "./address";

describe('Address unit tests', () => {

	it('should throw error when STREET has less than 3 characters', () => {
		expect(() => {
			new Address("St", 123, "1231513", "Lisbon");
		}).toThrowError("Street must be at least 3 characters long");
	})

	it('should throw error when NUMBER is less than 1', () => {
		expect(() => {
			new Address("Street 1", 0, "1231513", "Lisbon");
		}).toThrowError("Number must be greater than 0");
	})

	it('should throw error when POSTAL CODE has less than 3 characters', () => {
		expect(() => {
			new Address("Street 1", 123, "12", "Lisbon");
		}).toThrowError("Postal Code must be at least 3 characters long");
	})

	it('should throw error when CITY has less than 3 characters', () => {
		expect(() => {
			new Address("Street 1", 123, "1231513", "Li");
		}).toThrowError("City must be at least 3 characters long");
	})

	it('should create an address with valid data', () => {
		const address = new Address("Street 1", 123, "1231513", "Lisbon");
		expect(address).toBeDefined();
	})


})