import { ListEventsUseCase } from "../../../useCases/listEvents/ListEventsUseCase";
import { EventRepository } from "../../mocks/EventRepository";

describe('List Event', () => {

	let eventRepository: EventRepository;
	let listEventsUseCase: ListEventsUseCase;

	beforeEach(() => {
		eventRepository = new EventRepository();
		listEventsUseCase = new ListEventsUseCase(eventRepository);
	});

	it('should be able to list the events', async () => {
		const eventList = await listEventsUseCase.execute();

		expect(eventList[0]).toHaveProperty('id');
	});

	it('should throw an error 500 when the eventRepository create method return an error', async () => {
		try {
			eventRepository.findMany = async () => Promise.reject(new Error('Error'));
			listEventsUseCase = new ListEventsUseCase(eventRepository);

			await listEventsUseCase.execute();

		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});

	it('should throw an error 500 when the eventRepository create method return an AppError object', async () => {
		try {
			eventRepository.findMany = async () => Promise.reject({
				statusCode: 500,
				message: 'Error'
			});
			listEventsUseCase = new ListEventsUseCase(eventRepository);

			await listEventsUseCase.execute();

		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});
});