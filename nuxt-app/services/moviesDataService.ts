import type { IServiceResponse } from '~/types/serviceResponse';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { ServiceStatuses } from '~/enums/serviceStatuses';
import type {
	IMovieCard,
	IMovieComment,
	IMovieInfo,
	IMovieOfTheDay,
} from '~/types/movies';

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
): Promise<IServiceResponse<null>> => {
	try {
		await axios.post('/api/addComment', {
			movieId,
			commentText,
		});
		return createResponse(ServiceStatuses.SUCCESS, null);
	} catch (error) {
		const axiosError = error as AxiosError;
		const responseStatus = axiosError.response?.data as { message: string };
		return createResponse(ServiceStatuses.ERROR, null, responseStatus.message);
	}
};

export const getMovieGenres = async (): Promise<IServiceResponse<string[]>> => {
	try {
		const response = await axios.get('/api/getMovieGenres');
		return createResponse(ServiceStatuses.SUCCESS, response.data);
	} catch (error) {
		const axiosError = error as AxiosError;
		const responseStatus = axiosError.response?.data as { message: string };
		return createResponse(ServiceStatuses.ERROR, [], responseStatus.message);
	}
};

export const getMoviesByGenre = async (
	genre: string,
): Promise<IServiceResponse<IMovieCard[]>> => {
	try {
		const response = await axios.post('/api/getMoviesByGenre', { genre });
		return createResponse(ServiceStatuses.SUCCESS, response.data);
	} catch (error) {
		const axiosError = error as AxiosError;
		const responseStatus = axiosError.response?.data as { message: string };
		return createResponse(ServiceStatuses.ERROR, [], responseStatus.message);
	}
};
