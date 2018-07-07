import storage from '../utils/storage';

export default {
	namespace: 'global',

	state: {
		startupNum: 0,
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
			storage.get('startupNum').then(result => {
				result = parseInt(result) || 0;
				storage.set('startupNum', result + 1);
				dispatch({
					type: 'save',
					payload: {
						startupNum: result
					}
				});
			})
		}
	}
};