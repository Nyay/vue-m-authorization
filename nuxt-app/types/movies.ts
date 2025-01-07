import type { ObjectId } from 'mongodb';

interface IMovieBase {
	_id: string;
	title: string;
	poster?: string;
}

export interface IMovieOfTheDay extends IMovieBase {
	plot?: string;
	cast?: string[];
	directors?: string[];
}

export interface IMovieCard extends IMovieBase {
	year?: number;
	genres?: string[];
}

export interface IMovieInfo extends IMovieBase {
	plot?: string;
	genres?: string[];
	runtime?: number;
	cast?: string[];
	directors?: string[];
	num_mflix_comments?: number;
	released?: Date;
	writers?: string[];
	fullplot?: string;
	awards?: {
		wins: number;
		nominations: number;
		text: string;
	};
	year?: number;
	imdb?: {
		rating?: number;
		votes?: number;
		id?: number;
	};
	type: string;
	tomatoes?: {
		viewer?: {
			rating: number;
			meter: number;
			numReviews: number;
		};
		critic?: {
			rating: number;
			meter: number;
			numReviews: number;
		};
		fresh?: number;
		rotten?: number;
	};
}

export interface IMovieList {
  _id: ObjectId;
  title: string;
  year: number;
  plot?: string;
  genres?: string[];
  runtime?: number;
  cast?: string[];
  directors?: string[];
  num_mflix_comments?: number;
  released?: Date;
  writers?: string[];
  fullplot?: string;
  awards?: object;
  poster?: string;
  imdb?: object;
  type?: string;
  tomatoes?: object;
  languages?: string[];
}

export interface IMovieComment {
	_id: string;
	name: string;
	email: string;
	movie_id: string;
	text: string;
	date: Date;
}

export interface IMovieListFilter {
	genres?: string[];
	languages?: string[];
	minYear?: number;
	maxYear?: number;
	types?: string[];
}
