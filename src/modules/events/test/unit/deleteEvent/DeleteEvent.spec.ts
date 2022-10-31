import { DeleteEventRequestDTO } from "../../../DTOs/DeleteEventRequestDTO";
import { CreateEventUseCase } from "../../../useCases/createEvent/CreateEventUseCase";
import { DeleteEventUseCase } from "../../../useCases/deleteEvent/DeleteEventUseCase";
import { EventRepository } from "../../mocks/EventRepository";


describe('Delete Event', () => {

	let eventRepository: EventRepository;
	let createEventUseCase: CreateEventUseCase;
	let deleteEventUseCase: DeleteEventUseCase;

	beforeEach(() => {
		eventRepository = new EventRepository();
		createEventUseCase = new CreateEventUseCase(eventRepository);
		deleteEventUseCase = new DeleteEventUseCase(eventRepository);
	});

	it('should be able to delete a event', async () => {
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

		const event = await eventRepository.findById(eventCreated.event.id as string);

		const deleteRequest = {
			id: eventCreated.event.id,
			institution_id: event.institution_id
		} as DeleteEventRequestDTO

		const eventDeleted = await deleteEventUseCase.execute(deleteRequest);

		expect(eventDeleted.event).toHaveProperty('id');
	});

	it('should throw an error 401 when the institution is unauthorized', async () => {
		try {
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

			const deleteRequest = {
				id: eventCreated.event.id,
				institution_id: '123'
			} as DeleteEventRequestDTO

			await deleteEventUseCase.execute(deleteRequest);
		} catch (error) {
			expect(error.statusCode).toBe(401);
			expect(error.message).toBe('Unauthotized!');
		}
	});

	it('should throw an error 500 when the eventRepository create method return an error', async () => {
		try {
			eventRepository = new EventRepository();
			eventRepository.delete = async () => Promise.reject(new Error('Error'));
			createEventUseCase = new CreateEventUseCase(eventRepository);
			deleteEventUseCase = new DeleteEventUseCase(eventRepository);

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

			const event = await eventRepository.findById(eventCreated.event.id as string);

			const deleteRequest = {
				id: eventCreated.event.id,
				institution_id: event.institution_id
			} as DeleteEventRequestDTO

			await deleteEventUseCase.execute(deleteRequest);
		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});
});