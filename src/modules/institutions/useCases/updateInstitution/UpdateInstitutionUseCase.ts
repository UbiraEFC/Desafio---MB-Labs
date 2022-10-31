import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { UpdateInstitutionDataDTO } from "../../DTOs/UpdateInstitutionDataDTO";
import { UpdateInstitutionRequestDTO } from "../../DTOs/UpdateInstitutionRequestDTO";
import { UpdateInstitutionResponseDTO } from "../../DTOs/UpdateInstitutionResponseDTO";
import { IInstitutionRepository } from "../../interfaces/IInstitutionRepository";

export class UpdateInstitutionUseCase {
	constructor(
		private institutionRepository: IInstitutionRepository
	) { }

	async execute({
		id,
		name,
		description,
		email,
		image
	}: UpdateInstitutionRequestDTO): Promise<UpdateInstitutionResponseDTO> {

		try {
			const institution = await this.institutionRepository.findById(id);

			if (institution.email !== email) {
				const existEmail = await this.institutionRepository.findByEmail(email);
				existsOrError(!existEmail, 'Email already exists!');
			}

			const queryInstitution: UpdateInstitutionDataDTO = {
				data: {
					name,
					description,
					email,
					image,
					updated_at: new Date(),
				}
			}

			await this.institutionRepository.update(id, queryInstitution);
			
			return { message: "Updated records!" };
		} catch (error) {
			if(error.statusCode) throw error;
			throw new AppError(error.message);
		}
	}
}