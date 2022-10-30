import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { IInstitutionRepository, UpdateInstitutionData } from "../../repositories/IInstitutionRepository";

interface UpdateInstitutionRequest {
	id: string;
	name: string;
	description?: string;
	email: string;
	image?: string;
}

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
	}: UpdateInstitutionRequest): Promise<void> {

		try {

			const institution = await this.institutionRepository.findById(id);

			if (institution.email !== email) {

				const existEmail = await this.institutionRepository.findByEmail(email);
				existsOrError(!existEmail, 'Email already exists!');

			}

			const queryInstitution: UpdateInstitutionData = {
				data: {
					name,
					description,
					email,
					image,
					updated_at: new Date(),
				}
			}

			await this.institutionRepository.update(id, queryInstitution);

		} catch (error) {

			throw new AppError(error);

		}
	}
}