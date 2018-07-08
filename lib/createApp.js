/**
 * 创建app对象
 *
 * import createApp from 'react-native-dva';
 * // 1. create app and router
 * const app = createApp(...dva params)((getApp) => Navigator Component);
 *
 * // 2. create root component
 * app.root(({ Router, app }) => Component);
 *
 * // 3. run
 * AppRegistry.registerComponent('xxx', app.start);
 *
 * // Optional:
 * app.config(({ app }) => ({ ...config }));
 * app.getConfig();
 *
 * // if you use react-native-code-push
 * import codePushConfig from 'react-native-dva/codPushConfig';
 * app.config(codePushConfig({ ... })({ ...config }))
 *
 */
import React from 'react';
import { create } from 'dva-core';
import { Provider } from 'react-redux';
import createRouter, { routerMiddleware } from './createRouter';
import createConfig from './createConfig';
import { getCurrentRouteName } from './util';

export default function(options, ...params) {
	const { onAction, model } = options;
	let app = {};
	let RootComponent = () => null;
	let App = () => (
		<Provider store={app.getStore()}>
			<RootComponent/>
		</Provider>
	)

	return function(getAppNavigator) {
		let AppNavigator;
		if (getAppNavigator) {
			app = create({
				...options,
				onAction: [routerMiddleware, ...onAction],
			},...params);
		} else {
			app = create(options,...params);
		}

		app.start();

		app.getStore = () => app._store;

		if (getAppNavigator) AppNavigator = RootComponent = getAppNavigator(() => app);

		if (Array.isArray(model)) {
			model.forEach(m => app.model(m))
		}

		if (AppNavigator) RootComponent = createRouter(app, AppNavigator);

		app.config = (fn) => createConfig(app, fn({ app }));

		app.root = (fn) => RootComponent = fn({ Router: RootComponent, app });

		app.start = () => App;

		app.getCurrentRouteName = () => getCurrentRouteName(app._history);

		return app;
	}
}