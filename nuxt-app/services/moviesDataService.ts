import type { IServiceResponse } from '~/types/serviceResponse';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { ServiceStatuses } from '~/enums/serviceStatuses';
import type { IMovieOfTheDay } from '~/types/movies';

const { createResponse } = useServiceResponse();

export const getMovieOfTheDay = async (): Promise<
	IServiceResponse<IMovieOfTheDay | null>
> => {
	try {
		const response = await axios.get<IMovieOfTheDay>('/api/movieOfTheDay');
		return createResponse(ServiceStatuses.SUCCESS, response.data);
	} catch (error) {
		const axiosError = error as AxiosError;
		const responseStatus = axiosError.response?.data as { message: string };
		return createResponse(ServiceStatuses.ERROR, null, responseStatus.message);
	}
};
