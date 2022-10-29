import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { config } from "../../../../config";
import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { IInstitutionResponseDTO } from "../../dtos/IInstitutionResponseDTO";
import { IInstitutionRepository } from "../../repositories/IInstitutionRepository";

interface AuthenticateInstitutionRequest {
	email: string;
	password: string;
}

export class AuthenticateInstitutionUseCase {
	constructor(
		private institutionRepository: IInstitutionRepository
	) {}

	async execute({ email, password }: AuthenticateInstitutionRequest): Promise<IInstitutionResponseDTO> {

		try {
			existsOrError(email, 'Email is required!');
			existsOrError(password, 'Password is required!');
		} catch (msg) {
			throw new AppError(msg);
		}

		const institution = await this.institutionRepository.findByEmail(email);
		try {
			existsOrError(institution, 'Email or password incorrect!');
		} catch (msg) {
			throw new AppError(msg, 401);
		}

		const passwordMatch = await compare(password, institution.password);
		try {
			existsOrError(passwordMatch, 'Email or password incorrect!')
		} catch (msg) {
			throw new AppError(msg, 401);
		}

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
	}
}