import { userImg } from '../assets/imgs';

export default {
	namespace: 'user',

	state: {
		avatar: userImg,
		nickname: '',
	},

	reducers: {
		save(state, { payload }) {
			return {
				...state,
				...payload
			}
		},
	},

	subscriptions: {
		setup({ dispatch, history }, done) {
			dispatch({
				type: 'save',
				payload: {
					nickname: 'ck'
				}
			})
		}
	}
};