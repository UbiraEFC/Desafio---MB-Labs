import { UserRepository } from "../../mocks/UserRepository";
import { ShowUserUseCase } from "../../../useCases/showUser/ShowUserUseCase";

describe('Show User', () => {

	let userRepository: UserRepository;
	let showUserUseCase: ShowUserUseCase;

	beforeEach(() => {
		userRepository = new UserRepository();
		showUserUseCase = new ShowUserUseCase(userRepository);
	});

	it('should be able to show an User', async () => {
		const result = await showUserUseCase.execute({ id: 'string' });

		expect(result.user).toHaveProperty('name');
		expect(result.user).toHaveProperty('description');
		expect(result.user).toHaveProperty('email');
		expect(result.user).toHaveProperty('image');
	});

	it('should throw an error 400 when the User does not exists', async () => {
		try {
			const id = 'string';
			await showUserUseCase.execute({ id });

		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('User not found!');
		}
	});

	it('should throw an error 500 when the UserRepository findById method return an error', async () => {
		try {
			userRepository.findById = async () => Promise.reject(new Error('Error'));
			showUserUseCase = new ShowUserUseCase(userRepository);

			await showUserUseCase.execute({ id: 'string' });

		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});

	it('should throw an error 500 when the UserRepository findById method return an AppError object', async () => {
		try {
			userRepository.findById = async () => Promise.reject({
				statusCode: 500,
				message: 'Error'
			});
			showUserUseCase = new ShowUserUseCase(userRepository);

			await showUserUseCase.execute({ id: 'string' });

		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});
});