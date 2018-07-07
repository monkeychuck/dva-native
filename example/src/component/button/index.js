import React, { PureComponent } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native';

import { colors, fonts, layout } from '../../assets/styles';

export default ({ title, ...props }) => (
	<TouchableOpacity style={styles.container} {...props}>
		<Text style={styles.title}>
			{title}
		</Text>
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	container: {
		justifyContent:'center',
		alignItems:'center',
		borderRadius: 5,
		paddingHorizontal: layout.h_spacing,
		paddingVertical: layout.v_spacing,
		backgroundColor: colors.blue
	},
	title: {
		fontSize: fonts.h5,
		color: colors.white
	}
});