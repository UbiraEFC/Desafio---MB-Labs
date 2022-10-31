import sinon from "sinon";
import bcryptjs from "bcryptjs";
import { CreateInstitutionUseCase } from "../../../useCases/createInstitution/CreateInstitutionUseCase";
import { InstitutionRepository } from "../../mocks/InstitutionRepository";

describe('Create Institution', () => {

	let institutionRepository: InstitutionRepository;
	let createInstitutionUseCase: CreateInstitutionUseCase;

	beforeEach(() => {
		institutionRepository = new InstitutionRepository();
		createInstitutionUseCase = new CreateInstitutionUseCase(institutionRepository);
	});

	it('should be able to create a new event', async () => {
		const bcrypt = sinon.stub(bcryptjs, 'hash').resolvesArg(1);
		institutionRepository.findByEmail = async () => Promise.resolve(undefined);	
		const institutionToken = await createInstitutionUseCase.execute({
			name: 'string',
			description: 'string',
			email: 'string',
			password: 'string',
			image: 'string',
		});

		expect(institutionToken).toHaveProperty('token');
		expect(institutionToken).toHaveProperty('institution');

		bcrypt.restore();
	});

	it('should throw an error 400 when the name is not informed', async () => {
		try {
			await createInstitutionUseCase.execute({
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
			await createInstitutionUseCase.execute({
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
			await createInstitutionUseCase.execute({
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
			await createInstitutionUseCase.execute({
				name: 'string',
				description: 'string',
				email: 'string',
				password: 'string',
				image: 'string',
			});
			await createInstitutionUseCase.execute({
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

	it('should throw an error 500 when the institutionRepository create method return an error', async () => {
		try {
			institutionRepository.create = async () => Promise.reject(new Error('Error'));
			institutionRepository.findByEmail = async () => Promise.resolve(undefined);	
			createInstitutionUseCase = new CreateInstitutionUseCase(institutionRepository);

			await createInstitutionUseCase.execute({
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