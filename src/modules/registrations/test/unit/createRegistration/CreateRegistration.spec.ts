import { CreateRegistrationUseCase } from "../../../useCases/createRegistration/CreateRegistrationUseCase";
import { RegistrationRepository } from "../../mocks/RegistrationRepository";

describe('Create Registration', () => {

	let registrationRepository: RegistrationRepository;
	let createRegistrationUseCase: CreateRegistrationUseCase;

	beforeEach(() => {
		registrationRepository = new RegistrationRepository();
		createRegistrationUseCase = new CreateRegistrationUseCase(registrationRepository);
	});

	it('should be able to create a new registration', async () => {
		const result = await createRegistrationUseCase.execute({
			user_id: 'string',
			event_id: 'string',
		});

		expect(result).toHaveProperty('registration');
		expect(result.registration).toHaveProperty('id');

	});

	it('should throw an error 400 when the event_id is not informed', async () => {
		try {
			await createRegistrationUseCase.execute({
				user_id: 'string',
				event_id: '',
			});
		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('Event Id is required!');
		}
	});

	it('should throw an error 500 when the registrationRepository create method return an error', async () => {
		try {
			registrationRepository.create = async () => Promise.reject(new Error('Error'));
			createRegistrationUseCase = new CreateRegistrationUseCase(registrationRepository);

			await createRegistrationUseCase.execute({
				user_id: 'string',
				event_id: 'string',
			});
		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});
});