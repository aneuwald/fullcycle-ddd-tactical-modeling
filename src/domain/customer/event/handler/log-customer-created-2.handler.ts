import EventHandlerInterface from "../../../@shared/event/event-handler.interface";

export default class LogCustomerCreated2Handler implements EventHandlerInterface {
	handle(event: any) {
		console.log(`[${event.dateTimeOcurred.toISOString().split('T')[0]}]	This is the SECOND console.log of event: CustomerCreated`);
	}
}