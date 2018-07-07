import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { connect } from 'react-native-dva';

@connect(
	({ global, user }) => ({ ...global, ...user }),
)
export default class Page1 extends Component {

	render(){
		return (
			<View style={{ flex: 1 }}>
				<Text onPress={() => this.props.navigation.navigate('Page2')}>page1</Text>
			</View>
		)
	}
}