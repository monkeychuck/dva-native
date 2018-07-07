/**
 * 公共样式定义
 */
import { StyleSheet } from 'react-native';
import layout from './layout';
import colors from './colors';
import fonts from './fonts';

export default StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: colors.background_gray
	},
	flex: {
		flex: 1
	},
	row: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	padding: {
		paddingVertical: layout.v_spacing,
		paddingHorizontal: layout.h_spacing
	},
	paddingVertical: {
		paddingVertical: layout.v_spacing,
	},
	paddingHorizontal: {
		paddingHorizontal: layout.h_spacing
	},
	margin: {
		marginVertical: layout.v_spacing,
		marginHorizontal: layout.h_spacing
	},
	marginVertical: {
		marginVertical: layout.v_spacing,
	},
	marginHorizontal: {
		marginHorizontal: layout.h_spacing
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	borderBottom: {
		borderBottomWidth: layout.border_width,
		borderBottomColor: colors.gray_light
	},
	borderTop: {
		borderTopWidth: layout.border_width,
		borderTopColor: colors.gray_light
	},
	borderLeft: {
		borderLeftWidth: layout.border_width,
		borderLeftColor: colors.gray_light
	},
	borderRight: {
		borderRightWidth: layout.border_width,
		borderRightColor: colors.gray_light
	},
	fillParent: {
		position: 'absolute',
		left: 0, right: 0, top: 0, bottom: 0,
		backgroundColor: 'transparent'
	},
	deviceView: {
		height: layout.device_height,
		width: layout.device_width,
	},
	text: {
		fontSize: fonts.h5,
		color: colors.black
	},
	smallText: {
		fontSize: fonts.small,
		color: colors.black,
	},
});