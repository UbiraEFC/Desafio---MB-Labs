import { AppError } from "../../../../errors/AppError";
import { DeleteInstitutionRequestDTO } from "../../DTOs/DeleteInstitutionRequestDTO";
import { DeleteInstitutionResponseDTO } from "../../DTOs/DeleteInstitutionResponseDTO";
import { IInstitutionRepository } from "../../interfaces/IInstitutionRepository";

export class DeleteInstitutionUseCase {
	constructor(
		private institutionRepository: IInstitutionRepository
	) { }

	async execute({ id, institution_id }: DeleteInstitutionRequestDTO): Promise<DeleteInstitutionResponseDTO> {
		try {
			const institution = await this.institutionRepository.findById(id);

			if (institution_id !== institution.id) {
				throw new AppError("Unauthotized!", 401);
			}

			const institutionDeleted = await this.institutionRepository.delete(id);

			return { institution: { id: institutionDeleted.id } }
		} catch (error) {
			throw new AppError(error);
		}
	}
}