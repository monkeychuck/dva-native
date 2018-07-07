/**
 * 字体定义文件
 *
 * 设备的像素密度，例如：
 * 	PixelRatio.get() === 1          mdpi Android 设备 (160 dpi)
 * 	PixelRatio.get() === 1.5        hdpi Android 设备 (240 dpi)
 * 	PixelRatio.get() === 2          iPhone 4, 4S,iPhone 5, 5c, 5s,iPhone 6/7/8,xhdpi Android 设备 (320 dpi)
 * 	PixelRatio.get() === 3          iPhone 6/7/8 plus , xxhdpi Android 设备 (480 dpi)
 * 	PixelRatio.get() === 3.5        Nexus 6
 */
import { PixelRatio } from 'react-native';

let pixelRatio = PixelRatio.get(); // 当前设备的像素密度
let fontScale = PixelRatio.getFontScale(); // 字体大小缩放比例

let base = 14;
if (pixelRatio > 2) {
	base = 15;
} else {
	base = 14;
}

let fonts = {
	base: base,
	small: base * 0.8,
	h5: base,
};

// 生成h1 - h9字体大小, 每个等级相差base的0.15倍大小
let fontInterval = 0.2;
for (let i = 1; i < 10; i++) {
	fonts[`h${i}`] = base + base * (( 5 - i ) * fontInterval);
}

export default fonts;