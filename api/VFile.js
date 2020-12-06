
/**
* API provided for the bundled sources.
* @parameter {object} data data provided by the packer.
@constructor
*/
let VFile=function(data){
	for(let k in data)this[k]=data[k];
};

/** @property {string} VFile.name the file name. */
/** @property {string} VFile.mime the file mime type or 'dir' if it is a directory. */
/** @property {string} VFile.size the file size. */
/** @property {string} VFile.uri the file base64 uri. */


/** @property {constructor} VFile.API for prototype override. */
Object.defineProperty(VFile.prototype,'API',{get:function(){return VFile;},enumerable:true});
// classic files formats getters
/** @property {string} VFile.text content text. */
Object.defineProperty(VFile.prototype,'text',{get:function(){return _uri2text(this.uri);},enumerable:true});
/** @property {object} VFile.json content json. */
Object.defineProperty(VFile.prototype,'json',{get:function(){return _uri2json(this.uri);},enumerable:true});
/** @property {HTMLImageElement} VFile.image content image. */
Object.defineProperty(VFile.prototype,'img',{get:function(){return _uri2img(this.uri);},enumerable:true});
/** @property {HTMLAudioElement} VFile.audio content audio. */
Object.defineProperty(VFile.prototype,'audio',{get:function(){return _uri2audio(this.uri);},enumerable:true});
/** @property {HTMLVideoElement} VFile.video content video. */
Object.defineProperty(VFile.prototype,'video',{get:function(){return _uri2video(this.uri);},enumerable:true});

/**
get the folder files list
@return {array} if this element is a folder the current dir file list, else an empty list
*/
VFile.prototype.dir=function(){
	if(this.mime==='dir'){
		return Object.keys(this.files);
	}else {
		return [];
	}
};
/**
get the folder files and subfolder files list
@return {array} if this element is a folder the whole dir file list, else an empty list.
*/
VFile.prototype.all=function(){
	let fa_iter=(obj)=>{
		if(obj.mime==='dir'){
			let dn=obj.name?obj.name+'/':'';
			let r=[];
			for(let k in obj.files){
				r=r.concat(fa_iter(obj.files[k]).map(v=>dn+v));
			}
			return r;
		}else {
			return [obj.name];
		}
	};
	return fa_iter(this);
};

/**
get child file item by it's path.
* @parameter {string} path path from this dir down to a dir or a file.
@return {VFile} a new VFile item.
*/
VFile.prototype.get=function(path){
	let arr=((path instanceof Array)?path:path.split('/')).filter(v=>v!=='.');
	let tmp=this;
	for(let i=0,tmpp=[];i<arr.length;i++){
		tmpp.push(arr[i]);
		if(tmp.files&&(arr[i] in tmp.files)){
			tmp=tmp.files[arr[i]];
		}else {
			throw('\nVFile Error:\npath "'+arr[i]+'" not found.');
		}
	}
	return new VFile(tmp);
};

/**
verify if the child path is valid.
* @parameter {string} path path from this dir down to a dir or a file.
@return {boolean} true if the the ressource exists.
*/
VFile.prototype.exists=function(path){
	let arr=((path instanceof Array)?path:path.split('/')).filter(v=>v!=='.');
	let tmp=this;
	for(let i=0;i<arr.length;i++){
		if(tmp.files&&(arr[i] in tmp.files)){
			tmp=tmp.files[arr[i]];
		}else {
			return false;
		}
	}
	return true;
};

/**
Merge with strings as file uri.
@return {string} the file uri.
*/
VFile.prototype.toString=function(){
	return this.uri;
};

/**
Find VFile by filtering.
* @parameter {function||string} filter get fist file name containing **filter** or with witch **filter(data)** returns true.
@return {VFile|undefined} a VFile if found.
*/
VFile.prototype.find=function(filter){
	if(typeof(filter)!=='function'){
		let n=filter;
		filter=(v)=>v.name&&v.name.indexOf(n)>-1;
	}
	let find_iter=(vfile)=>{
		if(filter(vfile))return vfile;
		if(vfile.mime==='dir'){
			for(let k in vfile.files){
				let r=find_iter(vfile.files[k]);
				if(r)return new VFile(r);
			}
		}
	};
	return find_iter(this);
};

let _uri2text=function(uri){
	return decodeURIComponent(atob(uri.split(';base64,').pop())
	.split('')
	.map(c=>'%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
	.join(''));
};
let _uri2json=function(uri){
	return JSON.parse(_uri2text(uri));
};
let _uri2img=function(uri){
	let img=new Image();
	img.src=uri;
	return img;
};
let _uri2audio=function(uri){
	return new Audio(uri);
};
let _uri2video=function(uri){
	let vdo=document.createElement('video');
	vdo.src=uri;
	return vdo;
};
