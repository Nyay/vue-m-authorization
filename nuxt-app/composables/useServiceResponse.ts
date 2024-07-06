import type { IServiceResponse, TServiceResponseStatus } from '~/types/serviceResponse';

export const useServiceResponse = () => {
	const createResponse = <T>(status: TServiceResponseStatus, payload?: T, messageOrError?: string): IServiceResponse<T> => {
		if (status === 'success') {
			return {
				status,
				data: payload,
				message: messageOrError || 'Request was successful'
			};
		} else {
			return {
				status,
				error: messageOrError || 'An error occurred'
			};
		}
	};

	return {
		createResponse
	};
};
