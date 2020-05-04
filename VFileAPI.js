
let vmcomments=[
	'File generated by y-src-pack',
	'/!\\ Use y-src-pack rather than manually editing'
];

let vmcode=function(){

	let VFile=function(data){
		for(let k in data)this[k]=data[k];

		// for prototype override
		Object.defineProperty(this,'API',{get:()=>VFile,enumerable:true});
		// classic files formats
		Object.defineProperty(this,'text',{get:()=>_uri2text(this.uri),enumerable:true});
		Object.defineProperty(this,'json',{get:()=>_uri2json(this.uri),enumerable:true});
		Object.defineProperty(this,'img',{get:()=>_uri2img(this.uri),enumerable:true});
		Object.defineProperty(this,'audio',{get:()=>_uri2audio(this.uri),enumerable:true});
		Object.defineProperty(this,'video',{get:()=>_uri2video(this.uri),enumerable:true});
	};

	VFile.prototype.list=function(){
		if(this.mime==='dir'){
			return Object.keys(this.files);
		}else {
			return [];
		}
	};

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

	VFile.prototype.toString=function(){
		return this.uri;
	};

	VFile.prototype.find=function(filter){
		if(typeof(filter)!=='function'){
			let n=filter;
			filter=(v)=>v.name&&v.name.indexOf(n)>-1;
		}
		if(filter(this))return this;
		if(this.mime==='dir'){
			for(let k in this.files){
				let r=this.files[k].find(filter);
				if(r)return r;
			}
		}
	};

	let _uri2text=function(uri){
		return atob(uri.split(';base64,').pop());
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

	let _root_="%DATA%";

	return new VFile(_root_);
};
module.exports={
	comments:vmcomments,
	code:vmcode
};
