# y-src-pack

A js ressources bundler for web, nodejs and webpack.

Bundle any ressource file an application may require an exploit them syncronously via an API.

Install :

```
npm install y-src-pack
```
<hr/>

### Demo :
In command line, launch
```
node node_modules/y-src-pack/test
```
And open the file **node_modules/y-src-pack/_test_src/test.html** in your browser.
<hr/>

### Introduction :

Use in script :

```javascript
const YSrcPack = require('y-src-pack');
const path = require('path');
let sp = new YSrcPack();
// ...
```

with commands :
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

with options :
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
<hr/>

 ### Api reference

See the packed files api [here](https://github.com/yorgsite/y-src-pack/blob/master/VFileAPI.md).


 <hr/>

see [test.js](https://github.com/yorgsite/y-src-pack/blob/master/test.js) and [_test_src/test.html](https://github.com/yorgsite/y-src-pack/blob/master/_test_src/test.html)
