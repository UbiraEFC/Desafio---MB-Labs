import { DeleteInstitutionRequestDTO } from "../../../DTOs/DeleteInstitutionRequestDTO";
import { DeleteInstitutionUseCase } from "../../../useCases/deleteInstitution/DeleteInstitutionUseCase";
import { InstitutionRepository } from "../../mocks/InstitutionRepository";

describe('Delete Institution', () => {

	let institutionRepository: InstitutionRepository;
	let deleteInstitutionUseCase: DeleteInstitutionUseCase;

	beforeEach(() => {
		institutionRepository = new InstitutionRepository();
		deleteInstitutionUseCase = new DeleteInstitutionUseCase(institutionRepository);
	});

	it('should be able to delete a Institution', async () => {
		const institutionDeleted = await deleteInstitutionUseCase.execute({ id: 'string', institution_id: 'string' });

		expect(institutionDeleted.institution).toHaveProperty('id');
	});

	it('should throw an error 401 when the institution is unauthorized', async () => {
		try {
			await deleteInstitutionUseCase.execute({ id: 'string', institution_id: '1234' });
		} catch (error) {
			expect(error.statusCode).toBe(401);
			expect(error.message).toBe('Unauthotized!');
		}
	});
	
	it('should throw an error 500 when the InstitutionRepository delete method return an error', async () => {
		try {
			institutionRepository.delete = async () => Promise.reject(new Error('Error'));
			deleteInstitutionUseCase = new DeleteInstitutionUseCase(institutionRepository);

			await deleteInstitutionUseCase.execute({ id: 'string', institution_id: 'string' });

		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});
});