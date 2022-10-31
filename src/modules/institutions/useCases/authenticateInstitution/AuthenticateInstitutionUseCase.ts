import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { config } from "../../../../config";
import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { AuthenticateInstitutionRequestDTO } from "../../DTOs/AuthenticateInstitutionRequestDTO";
import { InstitutionResponseTokenDTO } from "../../DTOs/InstitutionResponseTokenDTO";
import { IInstitutionRepository } from "../../interfaces/IInstitutionRepository";

export class AuthenticateInstitutionUseCase {
	constructor(
		private institutionRepository: IInstitutionRepository
	) { }

	async execute({ email, password }: AuthenticateInstitutionRequestDTO): Promise<InstitutionResponseTokenDTO> {

		try {
			existsOrError(email, 'Email is required!');
			existsOrError(password, 'Password is required!');

			const institution = await this.institutionRepository.findByEmail(email);
			existsOrError(institution, 'Email or password incorrect!', 403);

			const passwordMatch = await compare(password, institution.password);
			existsOrError(passwordMatch, 'Email or password incorrect!', 403);

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
			throw new AppError(error);
		}
	}
}