import { InstitutionRepository } from "../../mocks/InstitutionRepository";
import { ShowInstitutionUseCase } from "../../../useCases/showInstitution/ShowInstitutionUseCase";

describe('Show Institution', () => {

	let institutionRepository: InstitutionRepository;
	let showInstitutionUseCase: ShowInstitutionUseCase;

	beforeEach(() => {
		institutionRepository = new InstitutionRepository();
		showInstitutionUseCase = new ShowInstitutionUseCase(institutionRepository);
	});

	it('should be able to show an Institution', async () => {
		const result = await showInstitutionUseCase.execute({ id: 'string' });

		expect(result.institution).toHaveProperty('name');
		expect(result.institution).toHaveProperty('description');
		expect(result.institution).toHaveProperty('email');
		expect(result.institution).toHaveProperty('image');
	});

	it('should throw an error 400 when the Institution does not exists', async () => {
		try {
			const id = 'string';
			await showInstitutionUseCase.execute({ id });

		} catch (error) {
			expect(error.statusCode).toBe(400);
			expect(error.message).toBe('Institution not found!');
		}
	});

	it('should throw an error 500 when the InstitutionRepository findById method return an error', async () => {
		try {
			institutionRepository.findById = async () => Promise.reject(new Error('Error'));
			showInstitutionUseCase = new ShowInstitutionUseCase(institutionRepository);

			await showInstitutionUseCase.execute({ id: 'string' });

		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});

	it('should throw an error 500 when the InstitutionRepository findById method return an AppError object', async () => {
		try {
			institutionRepository.findById = async () => Promise.reject({
				statusCode: 500,
				message: 'Error'
			});
			showInstitutionUseCase = new ShowInstitutionUseCase(institutionRepository);

			await showInstitutionUseCase.execute({ id: 'string' });

		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});
});