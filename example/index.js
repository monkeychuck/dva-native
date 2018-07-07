import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import codePush from 'react-native-code-push';

class Test extends Component {
	render() {
		return <View/>
	}
}

AppRegistry.registerComponent(appName, () => Test);
