import type { AxiosError } from 'axios';
import axios from 'axios';
import type { IServiceResponse } from '~/types/serviceResponse';
import { ServiceStatuses } from '~/enums/serviceStatuses';

interface LoginResponse {
    token: string;
}

export const checkUserCredentials = async (email: string, password: string): Promise<IServiceResponse<{ token?: string | undefined }>> => {
	const { createResponse } = useServiceResponse();

	try {
		const response = await axios.post<LoginResponse>('/api/login', { email, password });
		return createResponse(ServiceStatuses.SUCCESS, { token: response.data.token });
	} catch (error) {
		const axiosError = error as AxiosError;
		const responseStatus = axiosError.response?.data as { message: string };
		return createResponse(ServiceStatuses.ERROR, { token: undefined }, responseStatus.message);
	}
};
