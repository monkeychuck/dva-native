import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
} from 'react-native';
import { connect } from 'dva-native';
import Button from '../component/button';
import { commonStyles } from '../assets/styles';
import api from '../services/api';

class Page2 extends Component {
	state = {
		fetchData: null,
	}

	fetch = () => {
		api.getMockJsGithub()
			.then(({ data }) => {
				this.setState({ fetchData: data })
			})
	}

	render() {
		const { avatar, nickname } = this.props;
		const { fetchData } = this.state;
		return (
			<View style={[commonStyles.page, commonStyles.center]}>
				<Image
					source={avatar}
					style={{
						borderRadius: 100
					}}
				/>
				<Text style={commonStyles.text}>
					{nickname}
				</Text>
				<Text style={commonStyles.text}>
					{typeof fetchData === 'object' ? JSON.stringify(fetchData) : fetchData}
				</Text>
				<Button
					title="axios"
					onPress={this.fetch}
				/>
			</View>
		)
	}
}

export default connect(({ global, user }) => ({ ...global, ...user }))(Page2)