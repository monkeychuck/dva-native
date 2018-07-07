import React, { Component } from 'react';
import { StackNavigator } from 'react-native-dva/navigation';
import dynamic from 'react-native-dva/dynamic';

export default function({ app }) {
	// wrapper of dynamic
	const wrapper = (models, component) => dynamic({ app, models, component });

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