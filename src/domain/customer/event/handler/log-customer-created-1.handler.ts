import EventHandlerInterface from "../../../@shared/event/event-handler.interface";

export default class LogCustumerCreated1Handler implements EventHandlerInterface {
	handle(event: any) {
		console.log(`[${event.dateTimeOcurred.toISOString().split('T')[0]}]	This is the FIRST console.log of event: CustomerCreated`);
	}
}