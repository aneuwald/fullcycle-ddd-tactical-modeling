import EventHandlerInterface from "../event-handler.interface";

export default class MockEventHandler implements EventHandlerInterface {
	handle(event: any) {
		console.log(`[${event.dateTimeOcurred.toISOString().split('T')[0]}]	MOCK Event Handler`);
		console.log(`Data: ${event.eventData}`);
	}
}