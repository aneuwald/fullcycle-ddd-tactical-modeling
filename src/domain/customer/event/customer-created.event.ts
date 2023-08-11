import EventInterface from "../../@shared/event/event.interface";
import Customer from "../entity/customer";

export default class CustomerCreatedEvent implements EventInterface {

	private _dateTimeOcurred: Date;
	private _eventData: Customer;

	constructor(eventData: Customer) {
		this._dateTimeOcurred = new Date();
		this._eventData = eventData;
	}

	get dateTimeOcurred(): Date {
		return this._dateTimeOcurred;
	}

	get eventData(): any {
		return this._eventData;
	}

}