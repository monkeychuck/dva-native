import axios, { createLogger } from 'dva-native/axios';
import Mock from 'dva-native/mock';

Mock.mock('https://github.com/nuysoft/Mock', {
	data: 'nothing'
})

createLogger(axios);

const urls = {
	getMockJsGithub: 'GET /nuysoft/Mock',
}

const api = axios.create({
	baseURL: 'https://github.com',
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' },
	urls
});

export default api;