/**
 * 本地异步存储
 */
import { AsyncStorage } from 'react-native';

const getValue = value => {
	if (Array.isArray(value)) {
		return value.map(v => {
			v[1] = getValue(v[1]);
			return v;
		});
	}
	try {
		return JSON.parse(value);
	} catch(e) {
		return value;
	}
}

const setValue = value => {
	if (Array.isArray(value)) {
		return value.map(v => {
			v[1] = setValue(v[1]);
			return v;
		});
	}
	return JSON.stringify(value);
}

const Storage = {
	/**
	 * 获取本地存储内容
	 * @param key
	 * @returns {*}
	 */
	get(key) {
		let keyType = typeof key;
		if (keyType === 'string') {
			return AsyncStorage.getItem(key).then(getValue);
		} else if (keyType === 'object') {
			return AsyncStorage.multiGet(key).then(getValue);
		} else {
			return AsyncStorage.getAllKeys().then(Storage.get);
		}
	},

	/**
	 * 获取本地存储的所有键值
	 * @returns {array}
	 */
	getAllKeys() {
		return AsyncStorage.getAllKeys();
	},

	/**
	 * 存储或覆盖内容
	 * @param key
	 * @param value
	 * @returns {*}
	 */
	set(key, value) {
		let keyType = typeof key;
		if (keyType === 'string') {
			return AsyncStorage.setItem(key, JSON.stringify(value));
		} else if (keyType === 'object') {
			let opt = setValue(key);
			return AsyncStorage.multiSet(opt);
		}
	},

	/**
	 * 删除本地存储内容
	 * @param key
	 */
	remove(key) {
		let keyType = typeof key;
		if (keyType === 'string') {
			return AsyncStorage.removeItem(key);
		} else if (keyType === 'object') {
			return AsyncStorage.multiRemove(key);
		} else {
			return AsyncStorage.clear();
		}
	}
}

export default Storage;