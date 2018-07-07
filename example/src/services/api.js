import axios, { createLogger } from 'react-native-dva/axios';

createLogger(axios);

const urls = {
	getWordsTranslate: 'POST /v2transapi'
}

const api = axios.create({
	baseURL: 'https://fanyi.baidu.com',
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' },
	urls
});

export default api;