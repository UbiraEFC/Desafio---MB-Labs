export function existsOrError(value: any, msg: string) {
	if(!value) throw msg;
}