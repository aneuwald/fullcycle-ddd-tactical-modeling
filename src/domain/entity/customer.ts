import Address from "./address";

export default class Customer {
	private _id: string;
	private _name: string = "";
	private _address!: Address;
	private _active: boolean = false;
	private _rewardPoints: number = 0;

	constructor(id: string, name: string) {
		this._id = id;
		this._name = name;
		this.validate();
	}

	private validate() {
		if (this._id.length < 3) {
			throw new Error("Id must be at least 3 characters long");
		}
		if (this._name.length < 3) {
			throw new Error("Name must be at least 3 characters long");
		}
	}

	public changeName(newName: string) {
		this._name = newName;
		this.validate();
	}

	public setAddress(address: Address) {
		this._address = address;
	}

	public addRewardPoints(points: number) {
		this._rewardPoints += points;
	}

	public activate() {
		if (this._address === undefined) {
			throw new Error("Address is required to activate customer");
		}
		this._active = true;
	}

	public deactivate() {
		this._active = false;
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get address(): Address {
		return this._address;
	}

	get isActive(): boolean {
		return this._active;
	}

	get rewardPoints(): number {
		return this._rewardPoints;
	}




}