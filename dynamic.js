/**
 * 按需加载组件
 *
 * import dynamic from 'react-native-dva/dynamic';
 * dynamic({
 * 	app,
 * 	models: () => [require('xxx')],
 * 	component: () => require('xxx')
 * })
 *
 */
import React, { Component } from 'react';

const cached = {};

function registerModel(app, model) {
	model = model.default || model;
	if (!cached[model.namespace] && app.model) {
		app.model(model);
		cached[model.namespace] = 1;
	}
}

export default function dynamic(config) {
	const { app: getApp, models: resolveModels, component: resolveComponent } = config;

	// metro打包是commonJs规范, budnle包存在本地, 同步加载。
	function resolve() {
		const app = typeof getApp === 'function' ? getApp() : getApp;
		const models = typeof resolveModels === 'function' ? resolveModels() : [];
		const component = resolveComponent();
		if (models && models.length) {
			models.forEach(m => registerModel(app, m));
		}
		return component.default || component;
	}

	return class DynamicComponent extends Component {
		constructor(...args) {
			super(...args);
			this.Component = resolve();
		}

		render() {
			const { Component } = this;
			if (Component) return <Component {...this.props}/>
			return null
		}
	}
}