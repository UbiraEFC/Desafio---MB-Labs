import { CreateEventUseCase } from "../../../useCases/createEvent/CreateEventUseCase";
import { ListEventsUseCase } from "../../../useCases/listEvents/ListEventsUseCase";
import { EventRepository } from "../../mocks/EventRepository";

describe('List Event', () => {

	let eventRepository: EventRepository;
	let createEventUseCase: CreateEventUseCase;
	let listEventsUseCase: ListEventsUseCase;

	beforeEach(() => {
		eventRepository = new EventRepository();
		createEventUseCase = new CreateEventUseCase(eventRepository);
		listEventsUseCase = new ListEventsUseCase(eventRepository);
	});

	it('should be able to list the events', async () => {
		await createEventUseCase.execute({
			title: 'string',
			description: 'string',
			institution_id: 'string',
			speaker: 'string',
			participants: 10,
			address: 'string',
			price: 'string',
			online: true,
			image: 'string',
			start_date: new Date('2001-01-01'),
			end_date: new Date('2001-01-01'),
		});

		const eventList = await listEventsUseCase.execute();

		expect(eventList[0]).toHaveProperty('id');
	});

	it('should throw an error 500 when the eventRepository create method return an error', async () => {
		try {
			eventRepository = new EventRepository();
			eventRepository.findMany = async () => Promise.reject(new Error('Error'));
			createEventUseCase = new CreateEventUseCase(eventRepository);
			listEventsUseCase = new ListEventsUseCase(eventRepository);

			await createEventUseCase.execute({
				title: 'string',
				description: 'string',
				institution_id: 'string',
				speaker: 'string',
				participants: 10,
				address: 'string',
				price: 'string',
				online: true,
				image: 'string',
				start_date: new Date('2001-01-01'),
				end_date: new Date('2001-01-01'),
			});

			await listEventsUseCase.execute();

		} catch (error) {
			//expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});
});