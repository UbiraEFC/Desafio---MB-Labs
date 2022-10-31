import sinon from "sinon";
import bcryptjs from "bcryptjs";
import { CreateUserUseCase } from "../../../useCases/createUser/CreateUserUseCase";
import { UserRepository } from "../../mocks/UserRepository";

describe('Create User', () => {

	let userRepository: UserRepository;
	let createUserUseCase: CreateUserUseCase;

	beforeEach(() => {
		userRepository = new UserRepository();
		createUserUseCase = new CreateUserUseCase(userRepository);
	});

	it('should be able to create a new event', async () => {
		const bcrypt = sinon.stub(bcryptjs, 'hash').resolvesArg(1);
		userRepository.findByEmail = async () => Promise.resolve(undefined);	
		const userToken = await createUserUseCase.execute({
			name: 'string',
			description: 'string',
			email: 'string',
			password: 'string',
			image: 'string',
		});

		expect(userToken).toHaveProperty('token');
		expect(userToken).toHaveProperty('user');

		bcrypt.restore();
	});

	it('should throw an error 400 when the name is not informed', async () => {
		try {
			await createUserUseCase.execute({
				name: '',
				description: 'string',
				email: 'string',
				password: 'string',
				image: 'string',
			});
		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('Name is required!');
		}
	});

	it('should throw an error 400 when the email is not informed', async () => {
		try {
			await createUserUseCase.execute({
				name: 'string',
				description: 'string',
				email: '',
				password: 'string',
				image: 'string',
			});
		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('Email is required!');
		}
	});

	it('should throw an error 400 when the password is not informed', async () => {
		try {
			await createUserUseCase.execute({
				name: 'string',
				description: 'string',
				email: 'string',
				password: '',
				image: 'string',
			});
		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('Password is required!');
		}
	});

	it('should throw an error 400 when the email already exists', async () => {
		try {
			await createUserUseCase.execute({
				name: 'string',
				description: 'string',
				email: 'string',
				password: 'string',
				image: 'string',
			});
			await createUserUseCase.execute({
				name: 'string',
				description: 'string',
				email: 'string',
				password: 'string',
				image: 'string',
			});
		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('Email already exists!');
		}
	});

	it('should throw an error 500 when the UserRepository create method return an error', async () => {
		try {
			userRepository.create = async () => Promise.reject(new Error('Error'));
			userRepository.findByEmail = async () => Promise.resolve(undefined);	
			createUserUseCase = new CreateUserUseCase(userRepository);

			await createUserUseCase.execute({
				name: 'string',
				description: 'string',
				email: 'string',
				password: 'string',
				image: 'string',
			});
		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});
});