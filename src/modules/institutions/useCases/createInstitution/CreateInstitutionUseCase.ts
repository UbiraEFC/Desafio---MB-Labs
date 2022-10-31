import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { config } from "../../../../config";
import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { CreateInstitutionRequestDTO } from "../../DTOs/CreateInstitutionRequestDTO";
import { InstitutionDataDTO } from "../../DTOs/InstitutionDataDTO";
import { InstitutionResponseTokenDTO } from "../../DTOs/InstitutionResponseTokenDTO";
import { IInstitutionRepository } from "../../interfaces/IInstitutionRepository";

export class CreateInstitutionUseCase {
	constructor(
		private institutionRepository: IInstitutionRepository
	) { }

	async execute({
		name,
		description,
		email,
		password,
		image
	}: CreateInstitutionRequestDTO): Promise<InstitutionResponseTokenDTO> {

		try {

			const existEmail = await this.institutionRepository.findByEmail(email);
			existsOrError(name, 'Name is required!');
			existsOrError(email, 'Email is required!');
			existsOrError(password, 'Password is required!');
			existsOrError(!existEmail, 'Email already exists!');

			const passwordHash = await hash(password, 8);

			const queryInstitution: InstitutionDataDTO = {
				data: {
					name,
					description,
					email,
					password: passwordHash,
					image,
				}
			}

			const institution = await this.institutionRepository.create(queryInstitution);

			const token = sign({ id: institution.id, origin: "INSTITUTION" }, config.secretKey, {
				expiresIn: config.expireTime
			});

			const tokenReturn = {
				token,
				institution: {
					id: institution.id,
					created_at: institution.created_at,
					updated_at: institution.updated_at,
					last_login: institution.last_login
				}
			}

			return tokenReturn;
		} catch (error) {
			if(error.statusCode) throw error;
			throw new AppError(error.message);
		}
	}
}