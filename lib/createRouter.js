import React, { PureComponent } from 'react';
import { create } from 'dva-core';
import {
	reduxifyNavigator,
	createReactNavigationReduxMiddleware,
	createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

export const routerMiddleware = createReactNavigationReduxMiddleware(
	'root',
	state => state.router
);

export const getRouterReducer = (AppNavigator) => createNavigationReducer(AppNavigator);

export default function createRouter(app, AppNavigator) {
	const Navigator = reduxifyNavigator(AppNavigator, 'root');

	app._history = app.getStore().getState().router;

	class Router extends PureComponent {
		render() {
			const { dispatch, router } = this.props;
			return <Navigator dispatch={dispatch} state={router}/>
		}
	}
	return connect(({ router }) => ({ router }))(Router)
}