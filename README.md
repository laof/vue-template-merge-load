## Vue-template-merge-load
vue template static insert the HTML file . template combination . 

## Installing
```javascript
	npm install vue-template-merge-load --save-dev
```
## Example 
### carousel.vue `( Share a model object )`

```html
	<!-- only static path -->
	<div require="@/demo1.html"></div>
	<div require="@/demo2.html"></div>
	<div require="src/views/demo3.html"></div>
```


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
### It might be used
function resolve(dir) {
return path.join(__dirname, '..', dir)
}

## License
MIT


