import React, { Component } from 'react';
import { StackNavigator } from 'dva-native/navigation';
import dynamic from 'dva-native/dynamic';

export default function(getApp) {
	// wrapper of dynamic
	const wrapper = (models, component) => dynamic({ app: getApp, models, component });

	return StackNavigator({
		Page1: {
			screen: wrapper([], () => require('../pages/Page1'))
		},
		Page2: {
			screen: wrapper(
				() => [
					require('../models/user')
				],
				() => require('../pages/Page2')
			)
		}
	})
}