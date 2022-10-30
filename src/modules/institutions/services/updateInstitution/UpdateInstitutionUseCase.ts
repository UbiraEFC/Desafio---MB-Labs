import { hash } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { IInstitutionRepository, InstitutionData } from "../../repositories/IInstitutionRepository";

interface UpdateInstitutionRequest {
	id: string;
	name: string;
	description?: string;
	email: string;
	password: string;
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
		password,
		image
	}: UpdateInstitutionRequest): Promise<void> {

		try {

			existsOrError(name, 'Name is required!');
			existsOrError(email, 'Email is required!');
			existsOrError(password, 'Password is required!');

			const institution = await this.institutionRepository.findById(id);

			if (institution.email !== email) {

				const existEmail = await this.institutionRepository.findByEmail(email);
				existsOrError(!existEmail, 'Email already exists!');

			}

			const passwordHash = await hash(password, 8);

			const queryInstitution: InstitutionData = {
				data: {
					name,
					description,
					email,
					password: passwordHash,
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