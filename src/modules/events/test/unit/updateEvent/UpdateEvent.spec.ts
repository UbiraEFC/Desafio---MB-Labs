import { EventDataDTO } from '../../../DTOs/EventDataDTO';
import { CreateEventUseCase } from '../../../useCases/createEvent/CreateEventUseCase';
import { UpdateEventUseCase } from '../../../useCases/updateEvent/UpdateEventUseCase';
import { EventRepository } from '../../mocks/EventRepository';

describe('Update Event', () => {

	let eventRepository: EventRepository;
	let createEventUseCase: CreateEventUseCase;
	let updateEventUseCase: UpdateEventUseCase;

	beforeEach(() => {
		eventRepository = new EventRepository();
		createEventUseCase = new CreateEventUseCase(eventRepository);
		updateEventUseCase = new UpdateEventUseCase(eventRepository);
	});

	it('should be able to update an event', async () => {
		const eventCreated = await createEventUseCase.execute({
			title: 'string',
			description: 'string',
			institution_id: '123',
			speaker: 'string',
			participants: 10,
			address: 'string',
			price: 'string',
			online: true,
			image: 'string',
			start_date: new Date('2001-01-01'),
			end_date: new Date('2001-01-01'),
		});

		const event = await eventRepository.findById(eventCreated.event.id as string);
		const id = event.institution_id;
		const event_id = eventCreated.event.id as string

		expect(await updateEventUseCase.execute({
			id,
			event_id,
			title: 'string',
			description: 'string',
			speaker: 'string',
			participants: 10,
			address: 'string',
			price: 'string',
			online: true,
			image: 'string',
			start_date: new Date('2001-01-01'),
			end_date: new Date('2001-01-01'),
		})).resolves;
	});

	it('should throw an error 401 when the institution is unauthorized', async () => {
		try {
			const eventCreated = await createEventUseCase.execute({
				title: 'string',
				description: 'string',
				institution_id: '123',
				speaker: 'string',
				participants: 10,
				address: 'string',
				price: 'string',
				online: true,
				image: 'string',
				start_date: new Date('2001-01-01'),
				end_date: new Date('2001-01-01'),
			});

			const event = await eventRepository.findById(eventCreated.event.id as string);
			const id = event.institution_id;
			const event_id = eventCreated.event.id as string

			await updateEventUseCase.execute({
				id,
				event_id,
				title: 'string',
				description: 'string',
				speaker: 'string',
				participants: 10,
				address: 'string',
				price: 'string',
				online: true,
				image: 'string',
				start_date: new Date('2001-01-01'),
				end_date: new Date('2001-01-01'),
			});
		} catch (error) {
			expect(error.statusCode).toBe(401);
			expect(error.message).toBe('Unauthotized!');
		}
	});
	
	it('should throw an error 400 when the event does not exists', async () => {
		try {
						const event = await eventRepository.findById('123');
			const id = event.institution_id;
			const event_id = '123';

			await updateEventUseCase.execute({
				id,
				event_id,
				title: 'string',
				description: 'string',
				speaker: 'string',
				participants: 10,
				address: 'string',
				price: 'string',
				online: true,
				image: 'string',
				start_date: new Date('2001-01-01'),
				end_date: new Date('2001-01-01'),
			});
		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('Event does not exist!!');
		}
	});

	it('should throw an error 500 when the eventRepository create method return an error', async () => {
		try {
			eventRepository = new EventRepository();
			eventRepository.update = async () => Promise.reject(new Error('Error'));
			createEventUseCase = new CreateEventUseCase(eventRepository);
			updateEventUseCase = new UpdateEventUseCase(eventRepository);

			const eventCreated = await createEventUseCase.execute({
				title: 'string',
				description: 'string',
				institution_id: '123',
				speaker: 'string',
				participants: 10,
				address: 'string',
				price: 'string',
				online: true,
				image: 'string',
				start_date: new Date('2001-01-01'),
				end_date: new Date('2001-01-01'),
			});

			const event = await eventRepository.findById(eventCreated.event.id as string);
			const id = event.institution_id;
			const event_id = eventCreated.event.id as string

			await updateEventUseCase.execute({
				id,
				event_id,
				title: 'string',
				description: 'string',
				speaker: 'string',
				participants: 10,
				address: 'string',
				price: 'string',
				online: true,
				image: 'string',
				start_date: new Date('2001-01-01'),
				end_date: new Date('2001-01-01'),
			});
		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});
});