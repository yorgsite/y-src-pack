### <a name='main_menu'></a> Menu

+ [VFile](#tgt_VFile)
	+ [.API](#tgt_VFile.API)
	+ [.text](#tgt_VFile.text)
	+ [.json](#tgt_VFile.json)
	+ [.image](#tgt_VFile.image)
	+ [.audio](#tgt_VFile.audio)
	+ [.video](#tgt_VFile.video)
	+ [.dir](#tgt_VFile.prototype.dir)
	+ [.all](#tgt_VFile.prototype.all)
	+ [.get](#tgt_VFile.prototype.get)
	+ [.exists](#tgt_VFile.prototype.exists)
	+ [.toString](#tgt_VFile.prototype.toString)
	+ [.find](#tgt_VFile.prototype.find)

<hr/>

#### <a name="tgt_VFile"></a> ![](reference_src/md-icon_factory.png) VFile





`VFile(data)`
+ ![](reference_src/md-icon_input.png) `object` **data** : data provided by the packer.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.API"></a> ![](reference_src/md-icon_cube.png) .API





Property
+ ![](reference_src/md-icon_cube.png) `VFile.constructor` **[VFile].API** : for prototype override.

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


`[VFile].dir()`
+ ![](reference_src/md-icon_output.png) **return**<br/> `array` : if this element is a folder the current dir file list, else an empty list

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.prototype.all"></a> ![](reference_src/md-icon_function.png) .all


get the folder files and subfolder files list


`[VFile].all()`
+ ![](reference_src/md-icon_output.png) **return**<br/> `array` : if this element is a folder the whole dir file list, else an empty list.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.prototype.get"></a> ![](reference_src/md-icon_function.png) .get


get child file item by it's path.


`[VFile].get(path)`
+ ![](reference_src/md-icon_input.png) `string` **path** : path from this dir down to a dir or a file.
+ ![](reference_src/md-icon_output.png) **return**<br/> `VFile` : a new VFile item.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.prototype.exists"></a> ![](reference_src/md-icon_function.png) .exists


verify if the child path is valid.


`[VFile].exists(path)`
+ ![](reference_src/md-icon_input.png) `string` **path** : path from this dir down to a dir or a file.
+ ![](reference_src/md-icon_output.png) **return**<br/> `boolean` : true if the the ressource exists.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.prototype.toString"></a> ![](reference_src/md-icon_function.png) .toString


Merge with strings as file uri.


`[VFile].toString()`
+ ![](reference_src/md-icon_output.png) **return**<br/> `string` : the file uri.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.prototype.find"></a> ![](reference_src/md-icon_function.png) .find


Find VFile by filtering.


`[VFile].find(filter)`
+ ![](reference_src/md-icon_input.png) `function||string` **filter** : get fist file name containing **filter** or with witch **filter(data)** returns true.
+ ![](reference_src/md-icon_output.png) **return**<br/> `VFile|undefined` : a VFile if found.

[▲](#main_menu)

<hr/>

### <a name='main_legends'></a> Legends

![](reference_src/md-icon_factory.png) : constructor<br/>![](reference_src/md-icon_function.png) : method<br/>![](reference_src/md-icon_input.png) : parameter<br/>![](reference_src/md-icon_output.png) : return<br/>![](reference_src/md-icon_cube.png) : property