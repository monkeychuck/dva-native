# dva-native

encapsulating [react-navigation@2.x](https://github.com/react-navigation/react-navigation), [dva](https://github.com/dvajs/dva), [axios](https://github.com/axios/axios) and [Mock.js](https://github.com/nuysoft/Mock) for react-native

You can use [dva-native-cli](https://github.com/react-navigation/react-navigation)

## Start

```bash
npm install --save dva-native

// for react-navigation@1.x
npm install --save dva-native@0.1.x
```

### Api

## Export Files
### dva-native

Default export file

```js
import createApp, { connect } from 'dva-native';
```

### dva-native/navigation

Export the api of [react-navigation@2.x](https://github.com/react-navigation/react-navigation)

```js
import { ... } from 'dva-native/navigation';
```

### dva-native/axios

Async request library, export [axios](https://github.com/axios/axios)

```js
import axios, { createLogger } from 'dva-native/axios';
// if you want to print the request log
createLogger(axios);
```

### dva-native/mock

Export [Mock.js](https://github.com/nuysoft/Mock)

```js
import Mock from 'dva-native/mock';
```

### dva-native/dynamic

Load components on dynamic, metro is commonJs standard. If you want to split bundle, use react-native unbundle in android

```js
import dynamic from 'dva-native/dynamic';

const DynamicComponent = dynamic({
    app, // dva instance
    models: () => [require('./models/user')], // dva model
    component: () => require('./pages/Page'), // React Component
});
```

### dva-native/codePushConfig

If use react-native-code-push, Configuring some environmental params, but codePush.getConfiguration is a Promise. You may not be able to get it in time

```js
import codePushConfig from 'dva-native/codePushConfig';

app.config(codePushConfig({
    'code-push-key': { ...code push config }
})({
    ...base config
}))

app.getConfig()
```

## dva-native API
### `app = createApp(...dva opts)(getAppNavigator)`

Create dva instance

If use react-navigation, `getAppNavigator` must return Navigator 
```js
(getApp) => {
	const wrapper = (models, component) => dynamic({ 
	    app: getApp, models, component 
	});
	return createStackNavigator({
	    Page: {
	    	screen: wrapper(() => [require('./models/user')], () => require('./pages/Page')) 
	    }
	})
}
```

### `app.config`

Configure some params

```js
app.config(({ app }) => ({ ...config }))
// or
app.config(codePushConfig({ ... })({ ...config }))
```

### `app.getConfig`

Return params

```js
app.getConfig()
```

### `app.root`

This is necessary, and must return React Component

```js
app.root(({ Router, app }) => {
	return class Root extends Component {
		render() {
			return <Router/>
		}
	}
})
```

### `app.start`

Register Root Component

```js
AppRegistry.registerComponent('xxx', app.start);
```

### `...all dva instance API`
