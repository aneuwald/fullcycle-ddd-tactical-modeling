
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import EventDispatcher from "./event-dispatcher";
import MockEvent from "./mocks/mock-event";
import MockEventHandler from "./mocks/mock-event.handler";

describe('Doman events unit tests', () => {

	it('should register an event handler', () => {

		const eventDispatcher = new EventDispatcher();
		const eventHandler = new MockEventHandler();

		expect(eventDispatcher.eventHandlers['MockEvent']).toBeUndefined();

		eventDispatcher.register('MockEvent', eventHandler);

		expect(eventDispatcher.eventHandlers['MockEvent']).toBeDefined();
		expect(eventDispatcher.eventHandlers['MockEvent'].length).toBe(1);

	})

	it('should unregister an event handler', () => {

		const eventDispatcher = new EventDispatcher();
		const eventHandler = new MockEventHandler();

		eventDispatcher.register('MockEvent', eventHandler);

		expect(eventDispatcher.eventHandlers['MockEvent'].length).toBe(1);

		eventDispatcher.unregister('MockEvent', eventHandler);

		expect(eventDispatcher.eventHandlers['MockEvent'].length).toBe(0);

	})

	it('should unregister all event handlers', () => {

		const eventDispatcher = new EventDispatcher();
		const eventHandler = new MockEventHandler();
		const eventHandler2 = new MockEventHandler();

		eventDispatcher.register('MockEvent', eventHandler);
		expect(eventDispatcher.eventHandlers['MockEvent'].length).toBe(1);

		eventDispatcher.register('MockEvent', eventHandler2);
		expect(eventDispatcher.eventHandlers['MockEvent'].length).toBe(2);

		eventDispatcher.unregisterAll();

		expect(eventDispatcher.eventHandlers['MockEvent']).toBeUndefined();
	})

	it('should notify an event', () => {

		const eventDispatcher = new EventDispatcher();
		const eventHandler = new MockEventHandler();

		const spyHandler = jest.spyOn(eventHandler, 'handle');

		eventDispatcher.register('MockEvent', eventHandler);

		const mockEvent = new MockEvent('Mock Event Data')

		eventDispatcher.notify(mockEvent);

		expect(spyHandler).toBeCalledTimes(1);
	})

})