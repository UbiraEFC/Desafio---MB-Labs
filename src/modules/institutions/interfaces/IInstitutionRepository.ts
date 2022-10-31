import { Institution } from "@prisma/client";
import { InstitutionDataDTO } from "../DTOs/InstitutionDataDTO";
import { UpdateInstitutionDataDTO } from "../DTOs/UpdateInstitutionDataDTO";

export interface IInstitutionRepository {
	create(data: InstitutionDataDTO): Promise<Institution>;
	findById(id: string): Promise<Institution>;
	findByEmail(email: string): Promise<Institution>;
	findMany(): Promise<Institution[]>;
	delete(id: string): Promise<Institution>;
	update(id: string, data: UpdateInstitutionDataDTO): Promise<Institution>;
}