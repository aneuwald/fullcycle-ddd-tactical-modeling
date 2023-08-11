import EventHandlerInterface from "../../../@shared/event/event-handler.interface";

export default class LogCustomerAddressChangedHandler implements EventHandlerInterface {
	handle({ dateTimeOcurred, eventData: { id, name, newAddress } }: any) {
		console.log(`[${dateTimeOcurred.toISOString().split('T')[0]}]	Address of client: ${id}, ${name} changed to: ${newAddress}`);
	}
}