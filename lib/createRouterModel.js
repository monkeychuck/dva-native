import { NavigationActions } from 'react-navigation';

// NavigationActions = {
// 	BACK: "Navigation/BACK"
// 	COMPLETE_TRANSITION: "Navigation/COMPLETE_TRANSITION"
// 	INIT: "Navigation/INIT"
// 	NAVIGATE: "Navigation/NAVIGATE"
// 	POP: "Navigation/POP"
// 	POP_TO_TOP: "Navigation/POP_TO_TOP"
// 	PUSH: "Navigation/PUSH"
// 	REPLACE: "Navigation/REPLACE"
// 	RESET: "Navigation/RESET"
// 	SET_PARAMS: "Navigation/SET_PARAMS"
// 	URI: "Navigation/URI"
// 	back: ƒ ()
// 	completeTransition: ƒ ()
// 	init: ƒ ()
// 	navigate: ƒ ()
// 	pop: ƒ ()
// 	popToTop: ƒ ()
// 	push: ƒ ()
// 	replace: ƒ ()
// 	reset: ƒ ()
// 	setParams: ƒ ()
// 	uri: ƒ ()
// }

const delay = time => new Promise(resolve => setTimeout(resolve, time))

const actions = Object.values(NavigationActions).filter(
	x => typeof x === 'string' && x.startsWith('Navigation/')
)

const isPushAction = action =>
	action.type === NavigationActions.NAVIGATE ||
	action.type === NavigationActions.PUSH

export default function createRouterModel(routerReducer) {
	return {
		namespace: 'router',

		state: {
			...routerReducer(),
		},

		effects: {
			handlePush: [
				function* handlePush({ take, call, put }) {
					while (true) {
						const { payload } = yield take('handlePush')
						yield put({
							type: 'apply',
							payload,
						})
						if (payload.routeName != 'DrawerClose' && payload.routeName != 'DrawerOpen') {
							// debounce, see https://github.com/react-community/react-navigation/issues/271
							yield call(delay, 200)
						}
					}
				},
				{ type: 'watcher' },
			],
			watch: [
				function* watch({ take, put }) {
					while (true) {
						const action = yield take(actions)
						yield put({
							type: isPushAction(action) ? 'handlePush' : 'apply',
							payload: action,
						})
					}
				},
				{ type: 'watcher' },
			],
		},

		reducers: {
			apply(state, { payload: action }) {
				return routerReducer(state, action)
			},
		},
	}
}