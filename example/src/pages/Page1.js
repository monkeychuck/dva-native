import React, { Component } from 'react';
import {
	Text,
	View,
} from 'react-native';
import { connect } from 'dva-native';
import { commonStyles } from '../assets/styles';
import Button from '../component/button';

class Page1 extends Component {
	render(){
		const { startupNum, navigation } = this.props;
		return (
			<View style={[commonStyles.page, commonStyles.center]}>
				<Text style={commonStyles.text}>
					startup: {startupNum}
				</Text>
				<Button
					title="Jump Page2"
					onPress={() => navigation.navigate('Page2')}
				/>
			</View>
		)
	}
}

export default connect(({ global, user }) => ({ ...global, ...user }))(Page1)