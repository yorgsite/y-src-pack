# Api reference

The **VFile** API is a file like system for your resources.<br/>

Resource files and directories are all instances of **VFile**.<br/>

Your bundled js file is the root directory.<br/>

This documentation is generated from the jsdoc of the API.


Node web bundler environment :
```javascript
let myMedias=require('./myMedias.js');
...
```

Web environment :
```html
<script src="./myMedias.js"></script>
...
```

exemple
```javascript
...
let img = myMedias.get('path/to/img.png').img;
document.body.appendChild(img);
```

see [test.js](https://github.com/yorgsite/y-src-pack/blob/master/test.js) and [_test_src/test.html](https://github.com/yorgsite/y-src-pack/blob/master/_test_src/test.html)

<hr/>


### <a name='main_menu'></a> Menu

+ ![](reference_src/md-icon_factory.png) [VFile](#tgt_VFile)
	+ ![](reference_src/md-icon_cube.png) [.name](#tgt_VFile.name)
	+ ![](reference_src/md-icon_cube.png) [.mime](#tgt_VFile.mime)
	+ ![](reference_src/md-icon_cube.png) [.size](#tgt_VFile.size)
	+ ![](reference_src/md-icon_cube.png) [.uri](#tgt_VFile.uri)
	+ ![](reference_src/md-icon_cube.png) [.API](#tgt_VFile.API)
	+ ![](reference_src/md-icon_cube.png) [.text](#tgt_VFile.text)
	+ ![](reference_src/md-icon_cube.png) [.json](#tgt_VFile.json)
	+ ![](reference_src/md-icon_cube.png) [.image](#tgt_VFile.image)
	+ ![](reference_src/md-icon_cube.png) [.audio](#tgt_VFile.audio)
	+ ![](reference_src/md-icon_cube.png) [.video](#tgt_VFile.video)
	+ ![](reference_src/md-icon_function.png) [.dir](#tgt_VFile.prototype.dir)
	+ ![](reference_src/md-icon_function.png) [.all](#tgt_VFile.prototype.all)
	+ ![](reference_src/md-icon_function.png) [.get](#tgt_VFile.prototype.get)
	+ ![](reference_src/md-icon_function.png) [.exists](#tgt_VFile.prototype.exists)
	+ ![](reference_src/md-icon_function.png) [.toString](#tgt_VFile.prototype.toString)
	+ ![](reference_src/md-icon_function.png) [.find](#tgt_VFile.prototype.find)

<hr/>

#### <a name="tgt_VFile"></a> ![](reference_src/md-icon_factory.png) VFile


 API provided for the bundled sources.


`new VFile(data)`
+ ![](reference_src/md-icon_input.png) `object` **data** : data provided by the packer.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.name"></a> ![](reference_src/md-icon_cube.png) .name





Property
+ ![](reference_src/md-icon_cube.png) `string` **[VFile].name** : the file name.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.mime"></a> ![](reference_src/md-icon_cube.png) .mime





Property
+ ![](reference_src/md-icon_cube.png) `string` **[VFile].mime** : the file mime type or 'dir' if it is a directory.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.size"></a> ![](reference_src/md-icon_cube.png) .size





Property
+ ![](reference_src/md-icon_cube.png) `string` **[VFile].size** : the file size.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.uri"></a> ![](reference_src/md-icon_cube.png) .uri





Property
+ ![](reference_src/md-icon_cube.png) `string` **[VFile].uri** : the file base64 uri.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.API"></a> ![](reference_src/md-icon_cube.png) .API





Property
+ ![](reference_src/md-icon_cube.png) `constructor` **[VFile].API** : for prototype override.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.text"></a> ![](reference_src/md-icon_cube.png) .text





Property
+ ![](reference_src/md-icon_cube.png) `string` **[VFile].text** : content text.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.json"></a> ![](reference_src/md-icon_cube.png) .json





Property
+ ![](reference_src/md-icon_cube.png) `object` **[VFile].json** : content json.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.image"></a> ![](reference_src/md-icon_cube.png) .image





Property
+ ![](reference_src/md-icon_cube.png) `HTMLImageElement` **[VFile].image** : content image.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.audio"></a> ![](reference_src/md-icon_cube.png) .audio





Property
+ ![](reference_src/md-icon_cube.png) `HTMLAudioElement` **[VFile].audio** : content audio.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.video"></a> ![](reference_src/md-icon_cube.png) .video





Property
+ ![](reference_src/md-icon_cube.png) `HTMLVideoElement` **[VFile].video** : content video.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.prototype.dir"></a> ![](reference_src/md-icon_function.png) .dir


get the folder files list


`new [VFile].dir()`
+ ![](reference_src/md-icon_output.png) **return**<br/> `array` : if this element is a folder the current dir file list, else an empty list

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.prototype.all"></a> ![](reference_src/md-icon_function.png) .all


get the folder files and subfolder files list


`new [VFile].all()`
+ ![](reference_src/md-icon_output.png) **return**<br/> `array` : if this element is a folder the whole dir file list, else an empty list.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.prototype.get"></a> ![](reference_src/md-icon_function.png) .get


get child file item by it's path.


`new [VFile].get(path)`
+ ![](reference_src/md-icon_input.png) `string` **path** : path from this dir down to a dir or a file.
+ ![](reference_src/md-icon_output.png) **return**<br/> `VFile` : a new VFile item.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.prototype.exists"></a> ![](reference_src/md-icon_function.png) .exists


verify if the child path is valid.


`new [VFile].exists(path)`
+ ![](reference_src/md-icon_input.png) `string` **path** : path from this dir down to a dir or a file.
+ ![](reference_src/md-icon_output.png) **return**<br/> `boolean` : true if the the ressource exists.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.prototype.toString"></a> ![](reference_src/md-icon_function.png) .toString


Merge with strings as file uri.


`new [VFile].toString()`
+ ![](reference_src/md-icon_output.png) **return**<br/> `string` : the file uri.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.prototype.find"></a> ![](reference_src/md-icon_function.png) .find


Find VFile by filtering.


`new [VFile].find(filter)`
+ ![](reference_src/md-icon_input.png) `function||string` **filter** : get fist file name containing **filter** or with witch **filter(data)** returns true.
+ ![](reference_src/md-icon_output.png) **return**<br/> `VFile|undefined` : a VFile if found.

[▲](#main_menu)

<hr/>

### <a name='main_legends'></a> Legends

![](reference_src/md-icon_factory.png) : constructor<br/>![](reference_src/md-icon_function.png) : method<br/>![](reference_src/md-icon_input.png) : parameter<br/>![](reference_src/md-icon_output.png) : return<br/>![](reference_src/md-icon_cube.png) : property