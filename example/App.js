if (!__DEV__) {
	global.console = {
		info: () => {
		},
		log: () => {
		},
		warn: () => {
		},
		error: () => {
		},
	};
}

import React from 'react';
import createLogger from 'redux-logger';
import createApp from 'dva-native';
import codePushConfig from 'dva-native/codePushConfig';

import getRouter from './src/router';
import getRoot from './src/root';
import models from './src/models';
import { CODE_PUSH_KEY, DEV } from './src/config';

const app = global.App = createApp({
	model: models,
	onAction: __DEV__ ? [createLogger] : [],
})(getRouter)

app.config(codePushConfig(CODE_PUSH_KEY)(DEV));

app.root(getRoot);

console.log(app);

export default app;