import EventInterface from "../event.interface";

export default class MockEvent implements EventInterface {

	private _dateTimeOcurred: Date;
	private _eventData: any;

	constructor(eventData: any) {
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