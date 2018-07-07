import React, { Component } from 'react';
import {
	View,
	Text,
	StatusBar
} from 'react-native';
import { commonStyles } from './assets/styles';

export default function({ Router, app }) {
	let time = 5;
	return class Root extends Component {
		state = { time }

		componentDidMount() {
			this.timer = setInterval(() => {
				if (this.state.time == 0) {
					this.setState({ time: null })
					clearInterval(this.timer)
				} else {
					this.setState({
						time: --time
					})
				}
			})
		}

		componentWillUnmount() {
			this.timer && clearInterval(this.timer);
		}

		render() {
			return (
				<View style={commonStyles.flex}>
					<StatusBar
						animated={true}
						translucent={true}
						hidden={false}
						backgroundColor='rgba(0,0,0,0)'
						light-content="dark-content"
					/>
					{
						this.state.time != null ? (
							<View style={[commonStyles.flex,commonStyles.center]}>
								<Text style={commonStyles.text}>{this.state.time}</Text>
							</View>
						) : (
							<Router {...this.props}/>
						)
					}
				</View>
			)
		}
	}
}