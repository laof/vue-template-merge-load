## Vue-template-merge-load
vue template static insert the HTML file . template combination . 

## Installing
```javascript
	npm install vue-template-merge-load --save-dev
```
## Function
	function resolve(dir) {
	    return path.join(__dirname, '..', dir)
	}
## Example 
### webpack.base.conf.js `( After add to vue-loader )`

```javascript
	{ test: /\.vue$/,loader: 'vue-loader'..} ,
	{
		test: /carousel\.vue$/, // RegExp or Function
		loader: 'vue-template-merge-load',
		options:{ // Optional
			attr: 'require', // default
			alias: {
				'@': resolve('src/views')
				}
		}
	}
```

### xxx.vue

```html
	<!-- only static path -->
	<div require="@/demo.html"></div>
```

## License
MIT


