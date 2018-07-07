/**
 * layout距离,大小,变量定义文件
 * xs < sm < md < lg < xl
 */
import {
	Dimensions,
	StatusBar,
	StyleSheet
} from 'react-native';

const smallest = StyleSheet.hairlineWidth;
const { width, height } = Dimensions.get('window');

export default {
	// 水平间距
	h_spacing: 15,
	h_spacing_xs: 3,
	h_spacing_sm: 6,
	h_spacing_md: 9,
	h_spacing_lg: 15,
	h_spacing_xl: 21,

	// 垂直间距
	v_spacing: 9,
	v_spacing_xs: 3,
	v_spacing_sm: 6,
	v_spacing_md: 9,
	v_spacing_lg: 15,
	v_spacing_xl: 21,

	// 设备宽度
	device_width: width,
	device_width_xs: width * 0.2,
	device_width_sm: width * 0.4,
	device_width_md: width * 0.6,
	device_width_lg: width * 0.8,
	device_width_xl: width,

	// 设备高度
	device_height: height,
	device_height_xs: height * 0.2,
	device_height_sm: height * 0.4,
	device_height_md: height * 0.6,
	device_height_lg: height * 0.8,
	device_height_xl: height,

	// 状态栏
	statusBar_height: StatusBar.currentHeight || 20, // 状态栏高度, iphone X为44, 其他iphone为20

	// 线条尺寸
	border_width: smallest,
	border_width_xs: smallest * 0.8,
	border_width_sm: smallest,
	border_width_md: smallest * 1.2,
	border_width_lg: smallest * 1.5,
	border_width_xl: smallest * 1.8,
}