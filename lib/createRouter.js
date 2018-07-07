import React, { PureComponent } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import {
	initializeListeners,
	createReduxBoundAddListener,
	createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import createRouterModel from './createRouterModel';

export const routerMiddleware = createReactNavigationReduxMiddleware(
	'root',
	state => state.router
);

const addListener = createReduxBoundAddListener('root');

export default function createRouter(app, AppNavigator) {
	function routerReducer(state, action = {}) {
		return AppNavigator.router.getStateForAction(action, state);
	}

	app.model(createRouterModel(routerReducer));

	app._history = app.getStore().getState().router;

	class Router extends PureComponent {
		componentDidMount() {
			initializeListeners('root', this.props.router);
		}

		render() {
			const { dispatch, router } = this.props;
			const navigation = addNavigationHelpers({
				dispatch,
				state: router,
				addListener
			});
			return <AppNavigator navigation={navigation} />
		}
	}
	return connect(({ router }) => ({ router }))(Router)
}