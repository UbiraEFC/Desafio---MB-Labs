import { AppError } from "../../../../errors/AppError";
import { IInstitutionRepository } from "../../repositories/IInstitutionRepository";

interface IDeleteInstitutionResponse {
	institution: {
		id: string;
	}
}

interface IDeleteInstitutionRequest {
	id: string;
	institution_id: string
}

export class DeleteInstitutionUseCase {
	constructor(
		private institutionRepository: IInstitutionRepository
	) { }

	async execute({ id, institution_id }: IDeleteInstitutionRequest): Promise<IDeleteInstitutionResponse> {
		try {

			const institution = await this.institutionRepository.findById(id);

			if(institution_id === institution.id) {
				const institutionDeleted = await this.institutionRepository.delete(id);
				return { institution: { id: institutionDeleted.id } }
			}
			
			throw new AppError("Unauthotized!", 401);

		} catch (error) {
			
			throw new AppError(error);

		}
	}
}