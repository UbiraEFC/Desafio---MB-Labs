import sinon from "sinon";
import bcryptjs from "bcryptjs";
import { AuthenticateInstitutionUseCase } from "../../../useCases/authenticateInstitution/AuthenticateInstitutionUseCase";
import { InstitutionRepository } from "../../mocks/InstitutionRepository";

describe('Authenticate Institution', () => {

	let institutionRepository: InstitutionRepository;
	let authenticateInstitutionUsecase: AuthenticateInstitutionUseCase;

	beforeEach(() => {
		institutionRepository = new InstitutionRepository();
		authenticateInstitutionUsecase = new AuthenticateInstitutionUseCase(institutionRepository);
	});

	it('should be able to authenticate an institution', async () => {
		const bcrypt = sinon.stub(bcryptjs, 'compare').resolvesArg(1);
		const institutionToken = await authenticateInstitutionUsecase.execute({
			email: 'email@test',
			password: '123',
		});

		expect(institutionToken).toHaveProperty('token');
		expect(institutionToken).toHaveProperty('institution');

		bcrypt.restore();
	});

	it('should throw an error 400 when the email is not informed', async () => {
		try {
			await authenticateInstitutionUsecase.execute({
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


			await authenticateInstitutionUsecase.execute({
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


			await authenticateInstitutionUsecase.execute({
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


			await authenticateInstitutionUsecase.execute({
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
			institutionRepository.findByEmail = async () => Promise.reject(new Error('Error'));
			authenticateInstitutionUsecase = new AuthenticateInstitutionUseCase(institutionRepository);

			await authenticateInstitutionUsecase.execute({
				email: 'email@test',
				password: '123',
			});
		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});
});