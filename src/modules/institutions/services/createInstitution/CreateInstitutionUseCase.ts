import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { config } from "../../../../config";
import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { IInstitutionResponseDTO } from "../../dtos/IInstitutionResponseDTO";
import { IInstitutionRepository, InstitutionData } from "../../repositories/IInstitutionRepository";


interface CreateInstitutionRequest {
	name: string;
	description?: string;
	email: string;
	password: string;
	image?: string;
}

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
	}: CreateInstitutionRequest): Promise<IInstitutionResponseDTO> {

		try {

			const existEmail = await this.institutionRepository.findByEmail(email);
			existsOrError(name, 'Name is required!');
			existsOrError(email, 'Email is required!');
			existsOrError(password, 'Password is required!');
			existsOrError(!existEmail, 'Email already exists!');

		} catch (msg) {

			throw new AppError(msg);

		}

		try {
			
			const passwordHash = await hash(password, 8);

			const queryInstitution: InstitutionData = {
				data: {
					name,
					description,
					email,
					password: passwordHash,
					image,
				}
			}

			const institution = await this.institutionRepository.create(queryInstitution);

			const token = sign({}, config.secretKey, {
				subject: institution.id,
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

		} catch (msg) {

			throw new AppError(msg);

		}
	}
}