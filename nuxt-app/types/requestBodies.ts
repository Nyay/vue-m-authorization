import type { IMovieListFilter } from './movies';

export interface IMovieListRequestBody {
  filters: IMovieListFilter;
  cursor?: number;
}