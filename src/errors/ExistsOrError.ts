import { AppError } from "./AppError";

export function existsOrError(value: any, msg: string, status: number = 400) {
	if(!value) throw new AppError(msg, status || 400);
}