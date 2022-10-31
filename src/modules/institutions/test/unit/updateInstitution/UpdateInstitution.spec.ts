import { UpdateInstitutionUseCase } from '../../../useCases/updateInstitution/UpdateInstitutionUseCase';
import { InstitutionRepository } from '../../mocks/InstitutionRepository';

describe('Update Institution', () => {

	let institutionRepository: InstitutionRepository;
	let updateInstitutionUseCase: UpdateInstitutionUseCase;

	beforeEach(() => {
		institutionRepository = new InstitutionRepository();
		updateInstitutionUseCase = new UpdateInstitutionUseCase(institutionRepository);
	});

	it('should be able to update an Institution when the email is not changed', async () => {
		const result = await updateInstitutionUseCase.execute({
			id: 'string',
			name: 'string',
			description: 'string',
			email: 'string',
			image: 'string',
		});
		expect(result).toHaveProperty('message');
	});
	
	it('should be able to update an Institution when the email is changed and not exists', async () => {
		institutionRepository.findByEmail = async () => Promise.resolve(undefined);	
		
		const result = await updateInstitutionUseCase.execute({
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
			institutionRepository.findByEmail = async () => Promise.resolve({
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

			await updateInstitutionUseCase.execute({
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

	it('should throw an error 500 when the InstitutionRepository update method return an error', async () => {
		try {
			institutionRepository.update = async () => Promise.reject(new Error('Error'));
			updateInstitutionUseCase = new UpdateInstitutionUseCase(institutionRepository);

			await updateInstitutionUseCase.execute({
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