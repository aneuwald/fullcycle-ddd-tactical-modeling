import EventHandlerInterface from "../../../@shared/event/event-handler.interface";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface {
	handle(event: any) {
		console.log(`[${event.dateTimeOcurred.toISOString().split('T')[0]}]	Sending email event...- ID: ${event.eventData.id} | Product: ${event.eventData.name}	| Price: ${event.eventData.price}`)
	}
}