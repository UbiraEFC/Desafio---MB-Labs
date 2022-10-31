import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { InstitutionResponseDataDTO } from "../../DTOs/InstitutionResponseDataDTO";
import { ShowInstitutionRequestDTO } from "../../DTOs/ShowInstitutionRequestDTO";
import { IInstitutionRepository } from "../../interfaces/IInstitutionRepository";

export class ShowInstitutionUseCase {
	constructor(
		private institutionRepository: IInstitutionRepository
	) { }

	async execute({ id }: ShowInstitutionRequestDTO): Promise<InstitutionResponseDataDTO> {
		try {
			const institution = await this.institutionRepository.findById(id);
			existsOrError(institution, "Institution not found!");
			const institutionResponse = {
				institution: {
					name: institution.name,
					description: institution.description,
					email: institution.email,
					image: institution.image,
				}
			}
			
			return institutionResponse;
		} catch (error) {
			if(error.statusCode) throw error;
			throw new AppError(error.message);
		}
	}
}