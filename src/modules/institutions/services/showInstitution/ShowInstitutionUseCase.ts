import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { IInstitutionResponseDataDTO } from "../../dtos/IInstitutionResponseDataDTO";
import { IInstitutionRepository } from "../../repositories/IInstitutionRepository";

interface IShowInstitutionRequest {
	id: string;
}

export class ShowInstitutionUseCase {
	constructor(
		private institutionRepository: IInstitutionRepository
	) { }

	async execute({ id }: IShowInstitutionRequest): Promise<IInstitutionResponseDataDTO> {
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
			throw new AppError(error);
		}
	}
}