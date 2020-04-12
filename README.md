# y-src-pack

A js ressources bundler for web, nodejs and webpack

Install :

```
npm install y-src-pack
```
<br/>
Use in script :

```javascript
const YSrcPack = require('y-src-pack');
const path = require('path');
let fp = new YSrcPack();
// ...
```

with commands :
```javascript
// collect all sources
fp.collect(path.resolve(__dirname,'path/to/sources'));
// use glob expressions
fp.glob(path.resolve(__dirname,'path/to/other/sources'),expr);
fp.glob(path.resolve(__dirname,'path/to/other/sources2'),[expr1,expr2]);

// every files are merged as having the same root dir

//determines the tgt file content:
let jsname;
// - for json : true
jsname=true;
// - for web var : string
jsname='mymedias';
// - for node module : falsy
jsname=0;// or just nothing :p

fp.toFile(path.resolve(__dirname,'path/to/result.js'),jsname);
```

with options :
```javascript
YSrcPack.process({
	// --- dir method
	dir:path.resolve(__dirname,'path/to/sources'),
	// --- glob method
	glob:{
		dir:path.resolve(__dirname,'path/to/other/sources'),
		glob:[expr1,expr2]
	},

	tgtFile:path.resolve(__dirname,'path/to/result.js'),
	jsName:jsname
});
```

with **webpack** (same options) :
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
TODO ...


see [test.js](https://github.com/yorgsite/y-src-pack/blob/master/test.js) and [_test_src/test.html](https://github.com/yorgsite/y-src-pack/blob/master/_test_src/test.html)
