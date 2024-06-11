import { defineStore } from 'pinia';
import axios from 'axios';

interface IUser { email: string, password: string, name: string, _id: string }
interface IUsersStoreState { userList: IUser[] }

export const useUserStore = defineStore('users', {
	state: ():IUsersStoreState => ({
		userList: [],
	}),
	getters: {
		getUserList: (state) => state.userList,
	},
	actions: {
		async loadUsers() {
			const response = await axios.post('/api/users');

			if (response.data) {
				this.userList = response.data;
			}
		}
	},
});
