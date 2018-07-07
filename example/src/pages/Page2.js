import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { connect } from 'react-native-dva';

@connect(
	({ global }) => ({ global }),
)
export default class Page2 extends Component {

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Text>page2</Text>
			</View>
		)
	}
}