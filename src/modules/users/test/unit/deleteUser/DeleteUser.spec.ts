import { DeleteUserRequestDTO } from "../../../DTOs/DeleteUserRequestDTO";
import { DeleteUserUseCase } from "../../../useCases/deleteUser/DeleteUserUseCase";
import { UserRepository } from "../../mocks/UserRepository";

describe('Delete User', () => {

	let userRepository: UserRepository;
	let deleteUserUseCase: DeleteUserUseCase;

	beforeEach(() => {
		userRepository = new UserRepository();
		deleteUserUseCase = new DeleteUserUseCase(userRepository);
	});

	it('should be able to delete a User', async () => {
		const userDeleted = await deleteUserUseCase.execute({ id: 'string', user_id: 'string' });

		expect(userDeleted.user).toHaveProperty('id');
	});

	it('should throw an error 401 when the User is unauthorized', async () => {
		try {
			await deleteUserUseCase.execute({ id: 'string', user_id: '1234' });
		} catch (error) {
			expect(error.statusCode).toBe(401);
			expect(error.message).toBe('Unauthotized!');
		}
	});
	
	it('should throw an error 500 when the UserRepository delete method return an error', async () => {
		try {
			userRepository.delete = async () => Promise.reject(new Error('Error'));
			deleteUserUseCase = new DeleteUserUseCase(userRepository);

			await deleteUserUseCase.execute({ id: 'string', user_id: 'string' });

		} catch (error) {
			expect(error.statusCode).toBe(500);
			expect(error.message).toBe('Error');
		}
	});
});