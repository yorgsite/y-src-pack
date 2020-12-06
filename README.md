# y-src-pack

A js ressources bundler for web, nodejs and webpack.

Bundle any ressource file an application may require an exploit them syncronously via an API.

<hr/>

+  [Install](#tgt_install)
+  [Demo](#tgt_demo)
+  [Otions](#tgt_options)
+  [Exemples](#tgt_exemples)
	+  [With commands](#tgt_exemples_cmd)
	+  [With options](#tgt_exemples_opt)
	+  [With Webpack](#tgt_exemples_wp)
+  [API reference](#tgt_api_ref)

<hr/>


### <a name="tgt_install"></a> Install :

```
npm install y-src-pack
```

<hr/>

### <a name="tgt_demo"></a> Demo :
In command line, launch
```
node node_modules/y-src-pack/test
```
And open the file **node_modules/y-src-pack/_test_src/test.html** in your browser.


<hr/>

### <a name="tgt_options"></a> Options

+ Options
	+ dir `*`: `string|Array<string>|undefined` dir or list of dirs to parse.
	+ glob `*`: `object|Array<object>|undefined` object or list of objects to parse with glob.
		+ dir : `string` current working dir.
		+ glob: `string|Array<string>` glob expression.
	+ tgtFile : `string` **mandatory** the generated file path.
	+ jsName :`string|boolean|undefined` for node : **undefined** (do not set), for json : **true**, for web : **string** as api root var name.
	+ typescript (beta) : `boolean` compile as typescript if true.

`*` : At least one of **dir** or **glob** must be set.

<hr/>


### <a name="tgt_exemples"></a> Exemples :

<!-- Use in script : -->

```javascript
const YSrcPack = require('y-src-pack');
const path = require('path');
let sp = new YSrcPack();
// ...
```

<a name="tgt_exemples_cmd"></a>with commands *(deprecated in favor of options and may be removed in the next major upgrade )* :
```javascript
// collect all sources from a folder
sp.collect(path.resolve(__dirname,'path/to/sources'));

// use glob expressions
sp.glob(path.resolve(__dirname,'path/to/other/sources'),expr);
sp.glob(path.resolve(__dirname,'path/to/other/sources2'),[expr1,expr2]);

// every files are merged as having the same root dir

//determines the tgt file content:
let jsname;
// - for json : true
jsname=true;
// - for web var : string
jsname='mymedias';
// - for node module : falsy
jsname=0;// or just nothing :p

sp.toFile(path.resolve(__dirname,'path/to/result.js'),jsname);
```

<a name="tgt_exemples_opt"></a>with options :
```javascript
YSrcPack.process({
	// --- dir method (collect) (can be an array of strings)
	dir:path.resolve(__dirname,'path/to/sources'),
	// --- glob method (can be an array of objects)
	glob:{
		dir:path.resolve(__dirname,'path/to/other/sources'),
		glob:[expr1,expr2]
	},

	tgtFile:path.resolve(__dirname,'path/to/result.js'),
	jsName:jsname
});
```

<a name="tgt_exemples_wp"></a>with **webpack** (same options) :
```javascript
// in webpack.config.js
// ...
plugins:[
	new YSrcPack.WebpackPlugin({
		dir:path.resolve(__dirname,'path/to/sources'),
		tgtFile:path.resolve(__dirname,'path/to/result.js')
	}),
	// ...
],
// ...

```

<hr/>

### <a name="tgt_api_ref"></a> Api reference

See the packed files api [here](https://github.com/yorgsite/y-src-pack/blob/master/VFileAPI.md).


 <hr/>


see [test.js](https://github.com/yorgsite/y-src-pack/blob/master/test.js) and [_test_src/test.html](https://github.com/yorgsite/y-src-pack/blob/master/_test_src/test.html)
