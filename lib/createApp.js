/**
 * 创建app对象
 *
 * import createApp from 'react-native-dva';
 * // 1. create dva app
 * const app = createApp(...dva params);
 *
 * // 2. config app params
 * app.config(({ app }) => ({ ... }));
 *
 * // if you use react-native-code-push
 * import codePushConfig from 'react-native-dva/codPushConfig';
 * app.config(codePushConfig({ ... })({ ... }))
 *
 * // 3. create router
 * app.router(({ app }) => Component);
 *
 * // 4. create root component
 * app.root(({ Router, app }) => Component);
 *
 * // 5. run
 * AppRegistry.registerComponent('xxx', app.start);
 *
 */

import React from 'react';
import { create } from 'dva-core';
import { Provider } from 'react-redux';
import createRouter, { routerMiddleware } from './createRouter';
import createConfig from './createConfig';
import { getCurrentScreen } from './util';

export default function(options) {
	const { model, initReducer, onAction, ...opt } = options;

	const app = create({
		onAction: [routerMiddleware, ...onAction],
		...opt
	}, {
		initReducer
	});

	app.start();

	if (Array.isArray(model)) {
		model.forEach(m => app.model(m))
	}

	let RootComponent = () => null;

	const App = () => (
		<Provider store={app.getStore()}>
			<RootComponent/>
		</Provider>
	)

	app.getStore = () => app._store;

	app.router = (fn) => RootComponent = createRouter(app, fn({ app }));

	app.root = (fn) => RootComponent = fn({ Router: RootComponent, app });

	app.config = (fn) => createConfig(app, fn({ app }));

	app.start = () => App;

	app.getCurrentScreen = () => getCurrentScreen(app._history);

	return app;
}