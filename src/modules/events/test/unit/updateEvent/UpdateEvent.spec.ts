import { UpdateEventUseCase } from '../../../useCases/updateEvent/UpdateEventUseCase';
import { EventRepository } from '../../mocks/EventRepository';

describe('Update Event', () => {

	let eventRepository: EventRepository;
	let updateEventUseCase: UpdateEventUseCase;

	beforeEach(() => {
		eventRepository = new EventRepository();
		updateEventUseCase = new UpdateEventUseCase(eventRepository);
	});

	it('should be able to update an event', async () => {
		const result = await updateEventUseCase.execute({
			id: 'string',
			event_id: 'string',
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

		expect(result).toHaveProperty('message');
		expect(result.message).toBe('Updated records!');
	});

	it('should throw an error 401 when the institution is unauthorized', async () => {
		try {
			await updateEventUseCase.execute({
				id: 'test',
				event_id: 'string',
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
			expect(error.message).toBe('Unauthorized!');
		}
	});

	it('should throw an error 400 when the event does not exists', async () => {
		try {
			eventRepository.findById = async () => Promise.resolve(undefined);

			await updateEventUseCase.execute({
				id: 'string',
				event_id: 'string',
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
			expect(error.message).toBe('Event does not exist!');
		}
	});

	it('should throw an error 500 when the eventRepository update method return an error', async () => {
		try {
			eventRepository.update = async () => Promise.reject(new Error('Error'));
			updateEventUseCase = new UpdateEventUseCase(eventRepository);

			await updateEventUseCase.execute({
				id: 'string',
				event_id: 'string',
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
	
	it('should throw an error 500 when the eventRepository findById method return an error', async () => {
		try {
			eventRepository.findById = async () => Promise.reject(new Error('Error'));
			updateEventUseCase = new UpdateEventUseCase(eventRepository);

			await updateEventUseCase.execute({
				id: 'string',
				event_id: 'string',
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