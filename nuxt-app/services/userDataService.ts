import type { AxiosError } from 'axios';
import axios from 'axios';
import { ServiceStatuses } from '~/enums/serviceStatuses';
import type { IUser } from '~/types';
import type { IServiceResponse } from '~/types/serviceResponse';

const { createResponse } = useServiceResponse();

export const getCurrentUserInfo = async (): Promise<
	IServiceResponse<IUser | null>
> => {
	try {
		const response = await axios.post<IUser>('/api/userInfo');
		return createResponse(ServiceStatuses.SUCCESS, response.data);
	} catch (error) {
		const axiosError = error as AxiosError;
		const responseStatus = axiosError.response?.data as { message: string };
		return createResponse(ServiceStatuses.ERROR, null, responseStatus.message);
	}
};
