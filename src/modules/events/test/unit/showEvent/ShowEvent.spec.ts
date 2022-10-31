import { CreateEventUseCase } from "../../../useCases/createEvent/CreateEventUseCase";
import { EventRepository } from "../../mocks/EventRepository";
import { ShowEventUseCase } from "../../../useCases/showEvent/ShowEventUseCase";

describe('Show Event', () => {

	let eventRepository: EventRepository;
	let createEventUseCase: CreateEventUseCase;
	let showEventUseCase: ShowEventUseCase;

	beforeEach(() => {
		eventRepository = new EventRepository();
		createEventUseCase = new CreateEventUseCase(eventRepository);
		showEventUseCase = new ShowEventUseCase(eventRepository);
	});

	it('should be able to show an event', async () => {
		const eventCreated = await createEventUseCase.execute({
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

		const id = eventCreated.event.id as string

		const event = await showEventUseCase.execute({ id });

		expect(event).toHaveProperty('id');
		expect(event).toHaveProperty('title');
		expect(event).toHaveProperty('description');
		expect(event).toHaveProperty('institution_id');
		expect(event).toHaveProperty('speaker');
		expect(event).toHaveProperty('online');
		expect(event).toHaveProperty('price');
		expect(event).toHaveProperty('address');
		expect(event).toHaveProperty('created_at');
		expect(event).toHaveProperty('updated_at');
		expect(event).toHaveProperty('start_date');
		expect(event).toHaveProperty('end_date');
		expect(event).toHaveProperty('participants');
		expect(event).toHaveProperty('image');
	});

	it('should throw an error 400 when the event does not exists', async () => {
		try {
			const id = 'string';
			await showEventUseCase.execute({ id });

		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('Event not found!');
		}
	});

	it('should throw an error 500 when the eventRepository create method return an error', async () => {
		try {
			eventRepository = new EventRepository();
			eventRepository.findById = async () => Promise.reject(new Error('Error'));
			createEventUseCase = new CreateEventUseCase(eventRepository);
			showEventUseCase = new ShowEventUseCase(eventRepository);

			const eventCreated = await createEventUseCase.execute({
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

			const id = eventCreated.event.id as string
			await showEventUseCase.execute({ id });

		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});
});