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

#### <a name="tgt_VFile"></a> ![](https://via.placeholder.com/15/ff0000/000000?text=+) VFile





`VFile(data)`
+ ![](https://via.placeholder.com/15/158900/000000?text=+) `object` **data** : data provided by the packer.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.API"></a> ![](https://via.placeholder.com/15/0089E0/000000?text=+) .API





Property
+ ![](https://via.placeholder.com/15/0089E0/000000?text=+) `VFile.constructor` **[VFile].API** : for prototype override.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.text"></a> ![](https://via.placeholder.com/15/0089E0/000000?text=+) .text





Property
+ ![](https://via.placeholder.com/15/0089E0/000000?text=+) `string` **[VFile].text** : content text.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.json"></a> ![](https://via.placeholder.com/15/0089E0/000000?text=+) .json





Property
+ ![](https://via.placeholder.com/15/0089E0/000000?text=+) `object` **[VFile].json** : content json.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.image"></a> ![](https://via.placeholder.com/15/0089E0/000000?text=+) .image





Property
+ ![](https://via.placeholder.com/15/0089E0/000000?text=+) `HTMLImageElement` **[VFile].image** : content image.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.audio"></a> ![](https://via.placeholder.com/15/0089E0/000000?text=+) .audio





Property
+ ![](https://via.placeholder.com/15/0089E0/000000?text=+) `HTMLAudioElement` **[VFile].audio** : content audio.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.video"></a> ![](https://via.placeholder.com/15/0089E0/000000?text=+) .video





Property
+ ![](https://via.placeholder.com/15/0089E0/000000?text=+) `HTMLVideoElement` **[VFile].video** : content video.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.prototype.dir"></a> ![](reference_src/md-icon_function.png) .dir


get the folder files list


`[VFile].dir()`
+ ![](https://via.placeholder.com/15/ee9900/000000?text=+) **return**<br/> `array` : if this element is a folder the current dir file list, else an empty list

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.prototype.all"></a> ![](reference_src/md-icon_function.png) .all


get the folder files and subfolder files list


`[VFile].all()`
+ ![](https://via.placeholder.com/15/ee9900/000000?text=+) **return**<br/> `array` : if this element is a folder the whole dir file list, else an empty list.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.prototype.get"></a> ![](reference_src/md-icon_function.png) .get


get child file item by it's path.


`[VFile].get(path)`
+ ![](https://via.placeholder.com/15/158900/000000?text=+) `string` **path** : path from this dir down to a dir or a file.
+ ![](https://via.placeholder.com/15/ee9900/000000?text=+) **return**<br/> `VFile` : a new VFile item.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.prototype.exists"></a> ![](reference_src/md-icon_function.png) .exists


verify if the child path is valid.


`[VFile].exists(path)`
+ ![](https://via.placeholder.com/15/158900/000000?text=+) `string` **path** : path from this dir down to a dir or a file.
+ ![](https://via.placeholder.com/15/ee9900/000000?text=+) **return**<br/> `boolean` : true if the the ressource exists.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.prototype.toString"></a> ![](reference_src/md-icon_function.png) .toString


Merge with strings as file uri.


`[VFile].toString()`
+ ![](https://via.placeholder.com/15/ee9900/000000?text=+) **return**<br/> `string` : the file uri.

[▲](#main_menu)

<hr/>

#### <a name="tgt_VFile.prototype.find"></a> ![](reference_src/md-icon_function.png) .find


Find VFile by filtering.


`[VFile].find(filter)`
+ ![](https://via.placeholder.com/15/158900/000000?text=+) `function||string` **filter** : get fist file name containing **filter** or with witch **filter(data)** returns true.
+ ![](https://via.placeholder.com/15/ee9900/000000?text=+) **return**<br/> `VFile|undefined` : a VFile if found.

[▲](#main_menu)

<hr/>

### <a name='main_legends'></a> Legends

![](https://via.placeholder.com/15/ff0000/000000?text=+) : constructor<br/>![](reference_src/md-icon_function.png) : method<br/>![](https://via.placeholder.com/15/158900/000000?text=+) : parameter<br/>![](https://via.placeholder.com/15/ee9900/000000?text=+) : return<br/>![](https://via.placeholder.com/15/0089E0/000000?text=+) : property