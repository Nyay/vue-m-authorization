import { defineStore } from 'pinia';
import { getCurrentUserInfo } from '~/services';
import { ServiceStatuses } from '~/enums/serviceStatuses';
import type { IUser } from '~/types';
interface IUsersStoreState {
	currentUserInfo: IUser | null;
}

export const useUserStore = defineStore('users', {
	state: (): IUsersStoreState => ({
		currentUserInfo: null,
	}),
	getters: {},
	actions: {
		async loadUserInfo() {
			const response = await getCurrentUserInfo();

			if (response.status === ServiceStatuses.SUCCESS && response.data) {
				this.currentUserInfo = response.data;
			}
		},
	},
});
