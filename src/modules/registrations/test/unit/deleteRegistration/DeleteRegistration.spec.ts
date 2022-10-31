import { DeleteRegistrationUseCase } from "../../../useCases/deleteRegistration/DeleteRegistrationUseCase";
import { RegistrationRepository } from "../../mocks/RegistrationRepository";

describe('Delete Registration', () => {

	let registrationRepository: RegistrationRepository;
	let deleteRegistrationUseCase: DeleteRegistrationUseCase;

	beforeEach(() => {
		registrationRepository = new RegistrationRepository();
		deleteRegistrationUseCase = new DeleteRegistrationUseCase(registrationRepository);
	});

	it('should be able to Delete a new registration', async () => {
		const result = await deleteRegistrationUseCase.execute({
			id: 'string',
			user_id: 'string',
		});

		expect(result).toHaveProperty('registration');
		expect(result.registration).toHaveProperty('id');
	});

	it('should throw an error 401 when the event_id is not informed', async () => {
		try {
			await deleteRegistrationUseCase.execute({
				id: 'string',
				user_id: '123',
			});
		} catch (error) {
			expect(error.statusCode).toBe(401);
			expect(error.message).toBe('Unauthotized!');
		}
	});

	it('should throw an error 500 when the registrationRepository Delete method return an error', async () => {
		try {
			registrationRepository.findById = async () => Promise.reject(new Error('Error'));
			deleteRegistrationUseCase = new DeleteRegistrationUseCase(registrationRepository);

			await deleteRegistrationUseCase.execute({
				id: 'string',
				user_id: 'string',
			});
		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});
});