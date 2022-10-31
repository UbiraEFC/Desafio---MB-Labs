import { EventRepository } from "../../mocks/EventRepository";
import { RegistrationRepository } from "../../mocks/RegistrationRepository";
import { ListRegistrationsInEventUseCase } from "../../../useCases/listRegistrationsInEvent/ListRegistrationsInEventUseCase";

describe('List Registration', () => {

	let eventRepository: EventRepository;
	let registrationRepository: RegistrationRepository;
	let listRegistrationsInEventUseCase: ListRegistrationsInEventUseCase;

	beforeEach(() => {
		eventRepository = new EventRepository();
		registrationRepository = new RegistrationRepository();
		listRegistrationsInEventUseCase = new ListRegistrationsInEventUseCase
			(
				registrationRepository,
				eventRepository
			);
	});

	it('should be able to list the registartions in an event', async () => {
		const result = await listRegistrationsInEventUseCase.execute({
			event_id: 'string',
		});

		expect(result[0]).toHaveProperty('id');
		expect(result[0]).toHaveProperty('user_id');
		expect(result[0]).toHaveProperty('event_id');
	});

	it('should throw an error 400 when the event_id is not informed', async () => {
		eventRepository.findById = async () => Promise.resolve(undefined);
		listRegistrationsInEventUseCase = new ListRegistrationsInEventUseCase(
			registrationRepository,
			eventRepository
		);
		try {
			await listRegistrationsInEventUseCase.execute({
				event_id: '',
			});
		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('Event not found!');
		}
	});

	it('should throw an error 500 when the registrationRepository findById method return an error', async () => {
		try {
			eventRepository.findById = async () => Promise.reject(new Error('Error'));
			listRegistrationsInEventUseCase = new ListRegistrationsInEventUseCase(
				registrationRepository,
				eventRepository
			);

			await listRegistrationsInEventUseCase.execute({
				event_id: 'string',
			});
		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});

	it('should throw an error 500 when the registrationRepository findUsersRegistrations method return an error', async () => {
		try {
			registrationRepository.findUsersRegistrations = async () => Promise.reject({
				statusCode: 500,
				message: 'Error'
			});
			listRegistrationsInEventUseCase = new ListRegistrationsInEventUseCase(
				registrationRepository,
				eventRepository
			);

			await listRegistrationsInEventUseCase.execute({
				event_id: 'string',
			});
		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});

	it('should throw an error 500 when the registrationRepository findById method return an error', async () => {
		try {
			registrationRepository.findUsersRegistrations = async () => Promise.reject(new Error('Error'));
			listRegistrationsInEventUseCase = new ListRegistrationsInEventUseCase(
				registrationRepository,
				eventRepository
			);

			await listRegistrationsInEventUseCase.execute({
				event_id: 'string',
			});
		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});
});