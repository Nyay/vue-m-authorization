import type { IServiceResponse } from '~/types/serviceResponse';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { ServiceStatuses } from '~/enums/serviceStatuses';
import type { IMovieComment, IMovieInfo, IMovieOfTheDay } from '~/types/movies';

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

export const getMovieInfo = async (
	movieId: string,
): Promise<IServiceResponse<IMovieInfo | null>> => {
	try {
		const response = await axios.post('/api/movieInfo', { movieId });
		return createResponse(ServiceStatuses.SUCCESS, response.data);
	} catch (error) {
		const axiosError = error as AxiosError;
		const responseStatus = axiosError.response?.data as { message: string };
		return createResponse(ServiceStatuses.ERROR, null, responseStatus.message);
	}
};

export const getMovieComments = async (
	movieId: string,
): Promise<IServiceResponse<IMovieComment[] | null>> => {
	try {
		const response = await axios.post('/api/commentsByFilmId', { movieId });
		return createResponse(ServiceStatuses.SUCCESS, response.data);
	} catch (error) {
		const axiosError = error as AxiosError;
		const responseStatus = axiosError.response?.data as { message: string };
		return createResponse(ServiceStatuses.ERROR, null, responseStatus.message);
	}
};

export const addMovieComment = async (
	movieId: string,
	commentText: string,
	userId: string,
): Promise<IServiceResponse<null>> => {
	try {
		await axios.post('/api/addComment', {
			movieId,
			commentText,
			userId,
		});
		return createResponse(ServiceStatuses.SUCCESS, null);
	} catch (error) {
		const axiosError = error as AxiosError;
		const responseStatus = axiosError.response?.data as { message: string };
		return createResponse(ServiceStatuses.ERROR, null, responseStatus.message);
	}
};
