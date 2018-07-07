/**
 * axios.create添加urls参数, 添加日志打印
 *
 * import axois, { createLogger } from 'react-native-dva/axios';
 * createLogger(axios);
 * axios.create({ urls: { getProduct: 'POST /api.getProduct' } }, ... );
 * axios.getProduct();
 */
import axios from 'axios';

function createAxios(axios) {
	const create = axios.create;
	/**
	 * 添加urls参数, api集合, key值表示方法名, value字符串格式按空格拆分
	 * 	{ getProduct: 'POST /api/getProduct' }
	 */
	axios.create = function(config) {
		const { urls } = config;
		const newAxios = create(config);
		if (urls) {
			newAxios.getUrls = () => urls;
			const error = function(key) {
				if (newAxios.hasOwnProperty(key)) {
					console.warn('axios urls create fail, it has been included ' + key);
					return true;
				} else {
					return false;
				}
			}
			Object.keys(urls).forEach(key => {
				if (typeof urls[key] === 'function') {
					if (!error(key)) {
						newAxios[key] = urls[key];
					}
					return;
				}
				let [ method, url ] = urls[key].split(' ');
				method = method.toLowerCase();
				if (!error(url)) {
					newAxios[key] = function(config) {
						return newAxios.request({
							method,
							url,
							...config
						})
					}
				}
			})
		}
		return newAxios;
	}
	return axios;
}

export default createAxios(axios);

export const createLogger = (function() {
	function requestUse(config) {
		// console.log('logger request use', config)
		config.time = Date.now();
		return config;
	}

	function requestUseError(error) {
		// console.log('logger request error', error)
		try {
			const { config: { baseURL = '', url, time } } = error;
			console.group && console.group('http请求结束(报错)', ((Date.now() - time) / 1000) + '秒');
			console.log('%curl:', 'color: red', '\n', baseURL + url);
			console.log('%cconfig:', 'color: red', '\n',  config);
			console.log('%cerror:', 'color: red', '\n', error);
			console.groupEnd && console.groupEnd();
		} catch(e) {
			console.groupEnd && console.groupEnd();
		}
		return Promise.reject(error);
	}

	function responseUse(res) {
		// console.log('logger response use', res)
		try {
			const { config: { baseURL = '', url, time } } = res;
			console.group && console.group('http请求结束(成功)', ((Date.now() - time) / 1000) + '秒');
			console.log('%curl:', 'color: green', '\n', baseURL + url);
			console.log('%cresult:', 'color: green', '\n', res);
			console.groupEnd && console.groupEnd();
		} catch(e) {
			console.groupEnd && console.groupEnd();
		}
		return res;
	}

	function responseUseError(error) {
		// console.log('logger response error', error)
		try {
			const { config: { baseURL = '', url, time } } = error;
			console.group && console.group('http请求结束(响应错误)', ((Date.now() - time) / 1000) + '秒');
			console.log('%curl:', 'color: red', '\n', baseURL + url);
			console.log('%cconfig:', 'color: red', '\n', config);
			console.log('%cerror:', 'color: red', '\n', error);
			console.groupEnd && console.groupEnd();
		} catch(e) {
			console.groupEnd && console.groupEnd();
		}
		return Promise.reject(error);
	}

	return function(axios) {
		if (axios.create) {
			const create = axios.create;
			axios.create = function(config) {
				const newAxios = create(config);
				createLogger(newAxios);
				return newAxios
			}
		}
		axios.interceptors.request.use(requestUse, requestUseError);
		axios.interceptors.response.use(responseUse, responseUseError);
		return axios;
	}
})()