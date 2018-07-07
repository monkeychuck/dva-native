export default function(app, config) {
	app._config = config;
	app.getConfig = (key) => {
		const {
			appConfig = {},
			codePushConfig = {},
			...other
		} = config;
		const result = {
			appConfig,
			...other,
			...codePushConfig[appConfig.deploymentKey],
		}
		if (key) {
			return result[key]
		} else {
			return result;
		}
	}
	return app.getConfig();
}