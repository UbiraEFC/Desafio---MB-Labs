import { CreateEventUseCase } from '../../../useCases/createEvent/CreateEventUseCase';
import { EventRepository } from '../../mockRepositories/EventRepository';

describe('Create User', () => {

	let eventRepository: EventRepository;
	let createEventUseCase: CreateEventUseCase;

	beforeEach(() => {
		eventRepository = new EventRepository();
		createEventUseCase = new CreateEventUseCase(eventRepository);
	});

	it('should be able to create a new event', async () => {
		const eventInfo = await createEventUseCase.execute({
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

		expect(eventInfo.event).toHaveProperty('id');
		expect(eventInfo.event).toHaveProperty('created_at');
		expect(eventInfo.event).toHaveProperty('updated_at');
		expect(eventInfo.event).toHaveProperty('start_date');
		expect(eventInfo.event).toHaveProperty('end_date');
	});
	
	it('should be able to create a new event when online is false and participants is informed', async () => {
		const eventInfo = await createEventUseCase.execute({
			title: 'string',
			description: 'string',
			institution_id: 'string',
			speaker: 'string',
			participants: 10,
			address: 'string',
			price: 'string',
			online: false,
			image: 'string',
			start_date: new Date('2001-01-01'),
			end_date: new Date('2001-01-01'),
		});

		expect(eventInfo.event).toHaveProperty('id');
		expect(eventInfo.event).toHaveProperty('created_at');
		expect(eventInfo.event).toHaveProperty('updated_at');
		expect(eventInfo.event).toHaveProperty('start_date');
		expect(eventInfo.event).toHaveProperty('end_date');
	});
	
	it('should throw an error 400 when the title is not informed', async () => {
		try {
			await createEventUseCase.execute({
				title: undefined,
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
		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('Title is required!');
		}
	});
	
	it('should throw an error 400 when the price is not informed', async () => {
		try {
			await createEventUseCase.execute({
				title: 'string',
				description: 'string',
				institution_id: 'string',
				speaker: 'string',
				participants: 10,
				address: 'string',
				price: undefined,
				online: true,
				image: 'string',
				start_date: new Date('2001-01-01'),
				end_date: new Date('2001-01-01'),
			});
		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('Price is required!');
		}
	});
	
	it('should throw an error 400 when the address is not informed', async () => {
		try {
			await createEventUseCase.execute({
				title: 'string',
				description: 'string',
				institution_id: 'string',
				speaker: 'string',
				participants: 10,
				address: undefined,
				price: 'string',
				online: true,
				image: 'string',
				start_date: new Date('2001-01-01'),
				end_date: new Date('2001-01-01'),
			});
		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('Address is required!');
		}
	});
	
	it('should throw an error 400 when the Start date is not informed', async () => {
		try {
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
				start_date: undefined,
				end_date: new Date('2001-01-01'),
			});
		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('Start date is required!');
		}
	});
	
	it('should throw an error 400 when the End date is not informed', async () => {
		try {
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
				end_date: undefined,
			});
		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('End date is required!');
		}
	});
	
	it('should throw an error 400 when the Online is not informed', async () => {
		try {
			await createEventUseCase.execute({
				title: 'string',
				description: 'string',
				institution_id: 'string',
				speaker: 'string',
				participants: 10,
				address: 'string',
				price: 'string',
				online: undefined,
				image: 'string',
				start_date: new Date('2001-01-01'),
				end_date: new Date('2001-01-01'),
			});
		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('Online is required!');
		}
	});
	
	it('should throw an error 400 when the Online is false and participants is not informed', async () => {
		try {
			await createEventUseCase.execute({
				title: 'string',
				description: 'string',
				institution_id: 'string',
				speaker: 'string',
				participants: undefined,
				address: 'string',
				price: 'string',
				online: false,
				image: 'string',
				start_date: new Date('2001-01-01'),
				end_date: new Date('2001-01-01'),
			});
		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('Number of participants is required!');
		}
	});

	it('should throw an error 500 when the eventRepository create method return an error', async () => {
		try {

			eventRepository = new EventRepository();
			eventRepository.create = async () => Promise.reject(new Error('Error'));
			createEventUseCase = new CreateEventUseCase(eventRepository);

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
		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});
});