export function getCurrentRouteName(navigationState) {
	if (!navigationState) {
		return null;
	}
	const route = navigationState.routes[navigationState.index];
	if (route.routes) {
		return getCurrentScreen(route);
	}
	return route.routeName;
}