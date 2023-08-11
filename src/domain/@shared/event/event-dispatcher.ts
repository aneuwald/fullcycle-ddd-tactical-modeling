import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";


type EventHandlersType = Record<string, EventHandlerInterface<EventInterface>[]>

export default class EventDispatcher implements EventDispatcherInterface {

	private _eventHandlers: EventHandlersType = {};

	get eventHandlers(): EventHandlersType {
		return this._eventHandlers;
	}

	register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
		if (!this.eventHandlers[eventName]) {
			this.eventHandlers[eventName] = [];
		}
		this.eventHandlers[eventName].push(eventHandler);
	}

	unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
		const eventHandlers = this.eventHandlers[eventName];
		if (eventHandlers) {
			this.eventHandlers[eventName] = eventHandlers.filter(handler => handler !== eventHandler);
		}
	}

	unregisterAll(): void {
		this._eventHandlers = {};
	}

	notify(event: EventInterface): void {
		const eventHandlers = this.eventHandlers[event.constructor.name];
		if (eventHandlers) {
			eventHandlers.forEach(eventHandler => eventHandler.handle(event));
		}
	}

}