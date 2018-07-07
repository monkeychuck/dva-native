/**
 * 根据code-push-key配置
 *
 * app.config(codePushConfig({ 'key': { ... } })({ ... }))
 *
 */
import codePush from 'react-native-code-push';

let appConfig = {};

codePush.getConfiguration().then(result => Object.assign(appConfig, result));

export default (codePushConfig) => (config) => {
	if (config.app) {
		return {
			appConfig,
			codePushConfig
		}
	} else {
		return ({ app }) => ({
			...config,
			appConfig,
			codePushConfig
		})
	}
}