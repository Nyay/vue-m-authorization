import type { ServiceStatuses } from '~/enums/serviceStatuses';


export type TServiceResponseStatus = ServiceStatuses.SUCCESS | ServiceStatuses.ERROR;

export interface IServiceResponse<T> {
    status: TServiceResponseStatus;
    data?: T;
    message?: string;
    error?: string;
}
