import { UpdateUserUseCase } from '../../../useCases/updateUser/UpdateUserUseCase';
import { UserRepository } from '../../mocks/UserRepository';

describe('Update User', () => {

	let userRepository: UserRepository;
	let updateUserUseCase: UpdateUserUseCase;

	beforeEach(() => {
		userRepository = new UserRepository();
		updateUserUseCase = new UpdateUserUseCase(userRepository);
	});

	it('should be able to update an User when the email is not changed', async () => {
		const result = await updateUserUseCase.execute({
			id: 'string',
			name: 'string',
			description: 'string',
			email: 'string',
			image: 'string',
		});
		expect(result).toHaveProperty('message');
	});
	
	it('should be able to update an User when the email is changed and not exists', async () => {
		userRepository.findByEmail = async () => Promise.resolve(undefined);	
		
		const result = await updateUserUseCase.execute({
			id: 'string',
			name: 'string',
			description: 'string',
			email: 'email@test',
			image: 'string',
		});
		expect(result).toHaveProperty('message');
	});

	it('should throw an error 400 when the email informed to change already exists', async () => {
		try {
			userRepository.findByEmail = async () => Promise.resolve({
				id: "string",
				name: "string",
				description: "string",
				email: "email@test",
				password: "string",
				created_at: new Date("2001-01-01"),
				updated_at: new Date("2001-01-01"),
				last_login: new Date("2001-01-01"),
				image: "string",
			});

			await updateUserUseCase.execute({
				id: 'string',
				name: 'string',
				description: 'string',
				email: 'email@test',
				image: 'string',
			});

		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('Email already exists!');
		}
	});

	it('should throw an error 500 when the UserRepository update method return an error', async () => {
		try {
			userRepository.update = async () => Promise.reject(new Error('Error'));
			updateUserUseCase = new UpdateUserUseCase(userRepository);

			await updateUserUseCase.execute({
				id: 'string',
				name: 'string',
				description: 'string',
				email: 'string',
				image: 'string',
			});
		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});
});