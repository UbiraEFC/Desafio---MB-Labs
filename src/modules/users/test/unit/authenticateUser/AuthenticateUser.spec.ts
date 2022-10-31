import sinon from "sinon";
import bcryptjs from "bcryptjs";
import { AuthenticateUserUseCase } from "../../../useCases/authenticateUser/AuthenticateUserUseCase";
import { UserRepository } from "../../mocks/UserRepository";

describe('Authenticate User', () => {

	let userRepository: UserRepository;
	let authenticateUserUsecase: AuthenticateUserUseCase;

	beforeEach(() => {
		userRepository = new UserRepository();
		authenticateUserUsecase = new AuthenticateUserUseCase(userRepository);
	});

	it('should be able to authenticate an User', async () => {
		const bcrypt = sinon.stub(bcryptjs, 'compare').resolvesArg(1);
		const userToken = await authenticateUserUsecase.execute({
			email: 'email@test',
			password: '123',
		});

		expect(userToken).toHaveProperty('token');
		expect(userToken).toHaveProperty('user');

		bcrypt.restore();
	});

	it('should throw an error 400 when the email is not informed', async () => {
		try {
			await authenticateUserUsecase.execute({
				email: '',
				password: '123',
			});

		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('Email is required!');
		}
	});

	it('should throw an error 400 when the password is not informed', async () => {
		try {
			await authenticateUserUsecase.execute({
				email: 'email@test',
				password: '',
			});

		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('Password is required!');
		}
	});

	it('should throw an error 403 when the email is incorect or not found', async () => {
		try {
			await authenticateUserUsecase.execute({
				email: 'email@',
				password: '123',
			});
		} catch (error) {
			expect(error.statusCode).toBe(403);
			expect(error.message).toBe('Email or password incorrect!');
		}
	});

	it('should throw an error 403 when the password is incorect', async () => {
		try {
			await authenticateUserUsecase.execute({
				email: 'email@test',
				password: '1234',
			});
		} catch (error) {
			expect(error.statusCode).toBe(403);
			expect(error.message).toBe('Email or password incorrect!');
		}
	});

	it('should throw an error 500 when the eventRepository create method return an error', async () => {
		try {
			userRepository.findByEmail = async () => Promise.reject(new Error('Error'));
			authenticateUserUsecase = new AuthenticateUserUseCase(userRepository);

			await authenticateUserUsecase.execute({
				email: 'email@test',
				password: '123',
			});
		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});
});