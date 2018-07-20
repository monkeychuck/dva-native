export function getCurrentRouteName(navigationState) {
	if (!navigationState) {
		return null;
	}
	const route = navigationState.routes[navigationState.index];
	if (route.routes) {
		return getCurrentRouteName(route);
	}
	return route.routeName;
}

export function onGlobalError(callback) {
	let defaultHandler =
		(ErrorUtils.getGlobalHandler && ErrorUtils.getGlobalHandler()) ||
		ErrorUtils._globalHandler;

	ErrorUtils.setGlobalHandler(function(error, isFatal) {
		defaultHandler(error, isFatal);
		callback(error, isFatal);
	});
}

export function setGlobalError(callback) {
	// 只有在非调试环境下才会重置错误处理
	if (!global.__DEV__) {
		ErrorUtils.setGlobalHandler(callback);
	} else {
		onGlobalError(callback)
	}
}