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
import createApp from 'react-native-dva';
import codePushConfig from 'react-native-dva/codePushConfig';

import getRouter from './src/router';
import getRoot from './src/root';
import models from './src/models';
import { CODE_PUSH_KEY, SERVER_URL, DEV } from './src/config';

const app = global.App = createApp({
	model: models,
	onAction: __DEV__ ? [createLogger] : [],
})

app.config(codePushConfig(CODE_PUSH_KEY)({ SERVER_URL, ...DEV }));

app.router(getRouter);

app.root(getRoot);

export default app.start;