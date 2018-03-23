# vue-template-merge-load
vue template static insert the HTML file . template combination . 

## Installing
```javascript
	npm install vue-template-merge-load --save-dev
```
## Function

```javascript
	function resolve(dir) {
	    return path.join(__dirname, '..', dir)
	}
```
## Configuration
#### webpack.base.conf.js
#### Important : After add to vue-loader
```javascript
    rules: [
	 //.....
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
	  },
      {
        test: /carousel\.vue$/,  //RegExp or function
	loader: 'vue-template-merge-load',
	include: [resolve('src')],
	options:{
		attr:'require', //default
		alias: {
		  'views': resolve('src/views'),
		  '@': resolve('src'),
		  }
		}
	}
	 //''''
	]
```

## Usage


#### demo.html

```html

<div v-if="show">
	<h1>{{message}}</h1>
</div>

```


#### canvas.vue


```html
<template>
	<div>
		<h2>demo<h2>
		<!-- only static path -->
		<div class="test" require="@/views/demo.html"></div>
	</div>
</template>
<script>
 //...
</script>
```

Output (simplified):

```html
<h2>demo<h2>
<div class="test" >
	<div v-if="show"> <h1>{{message}}</h1> </div>
</div>
```

## license
MIT


