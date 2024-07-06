interface IMovie {
	_id: string;
	title: string;
	year?: number;
	poster?: string;
	plot?: string;
	imdb?: {
		rating: number | null;
	};
	tomatoes?: {
		fresh: number | null;
	};
}

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

export interface IMovieCard extends IMovie {
	isExtended: boolean;
}
