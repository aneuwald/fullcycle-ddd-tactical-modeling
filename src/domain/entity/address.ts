export default class Address {

	_street: string;
	_number: number;
	_postalCode: string;
	_city: string;

	constructor(street: string, number: number, postalCode: string, city: string) {
		this._street = street;
		this._number = number;
		this._postalCode = postalCode;
		this._city = city;

		this.validate();
	}

	private validate() {
		if (this._street.length < 3) {
			throw new Error("Street must be at least 3 characters long");
		}
		if (this._number < 1) {
			throw new Error("Number must be greater than 0");
		}
		if (this._postalCode.length < 3) {
			throw new Error("Postal Code must be at least 3 characters long");
		}
		if (this._city.length < 3) {
			throw new Error("City must be at least 3 characters long");
		}
	}

	get street(): string {
		return this._street;
	}

	get number(): number {
		return this._number;
	}

	get postalCode(): string {
		return this._postalCode;
	}

	get city(): string {
		return this._city;
	}

}