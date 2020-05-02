const mime = require('mime');// npm install mime -save-dev
const fs = require('fs');
const styl=require('node-styl');
const glob = require('glob');

// ---------- generated code
let vmComments=[
	'File generated by y-src-pack',
	'/!\\ Use y-src-pack instead of edit manualy'
];

let vmcode=function(){

	let VFile=function(data){
		for(let k in data){
			this[k]=data[k];
		}
		// for prototype override
		Object.defineProperty(this,'API',{get:()=>VFile});

		Object.defineProperty(this,'text',{get:()=>_uri2text(this.uri)});
		Object.defineProperty(this,'json',{get:()=>_uri2json(this.uri)});
		Object.defineProperty(this,'img',{get:()=>_uri2img(this.uri)});
		Object.defineProperty(this,'audio',{get:()=>_uri2audio(this.uri)});
		Object.defineProperty(this,'video',{get:()=>_uri2video(this.uri)});
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

// ------------- tools

let barstyl=(s)=>styl(s).magenta+'';
let dotstyl=(s)=>styl(s).yellow.bold+'';
let boldstyl=(s)=>styl(s).cyan.bold+'';

let f2uri=function(mime,path){
	let b64=fs.readFileSync(path, {encoding: 'base64'});
	return `data:${mime};base64,${b64}`;
};
let collect=function(root,dirname,fpack){
	let obj={};
	let files=fs.readdirSync(dirname);
	files.forEach(file=> {
		let path=dirname+'/'+file;
		let stat=fs.statSync(path);
		let sobj={};
		sobj.name=file;
		if(stat.isDirectory()){
			sobj.mime='dir';
			sobj.files=collect(root,path,fpack);
		}else {
			fpack.loglist.push(barstyl('║')+dotstyl(' ● ')+path.substr(root.length+1));
			sobj.mime=mime.getType(path);
			sobj.size=stat.size;
			sobj.uri=f2uri(sobj.mime,path);
		}
		obj[file]=sobj;
	});

	return obj;
};
let f2obj=function(fpack,rootDir,files){
	let obj={mime:'dir',files:{}};
	files.forEach(f=>{
		fpack.loglist.push(barstyl('║')+dotstyl(' ● ')+f);
		ft2obj(rootDir,f.split('/'),obj);
	});
	return obj;
};
let ft2obj=function(rootDir,ftree,obj){
	let tmp=obj;
	let i=0,tu;
	for(;i<ftree.length;i++){
		tu=ftree[i];
		if(!(tu in tmp.files)){
			tmp.files[tu]={};
		}
		tmp=tmp.files[tu];
		tmp.name=tu;
		if(i<ftree.length-1){
			tmp.mime='dir';
			if(!tmp.files)tmp.files={};
		}else {
			let path=rootDir+'/'+ftree.join('/');
			let stat=fs.statSync(path);
			tmp.mime=mime.getType(path);
			tmp.size=stat.size;
			tmp.uri=f2uri(tmp.mime,path);
		}
	}
};
let mergeDatas=function(tgt,src){
	if(!tgt||!tgt.mime)return src;
	if(tgt.mime==='dir'){
		if(src.mime==='dir'){
			for(let k in src.files){
				tgt.files[k]=mergeDatas(tgt.files[k],src.files[k])
			}
		}
	}
	return tgt;
};
let cookDatas=function(data){
	if(data.mime==='dir'){
		data.size=0;
		for(let k in data.files){
			let st=cookDatas(data.files[k]);
			data.size+=st.size;
		}
	}
	return data;
};
// ------------- core

/**
@constructor
*/
const YSrcPack=function(){
	this.loglist=[];
	this.data={};
	this.collect=function(rootDir){
		if(rootDir instanceof Array){
			rootDir.forEach(e=>this.collect(rootDir));
		}else {
			this.loglist.push(barstyl('║')+' collect files from '+boldstyl(rootDir));
			this.data=mergeDatas(this.data,{mime:'dir',files:collect(rootDir,rootDir,this)});
			this.loglist.push(barstyl('║')+' ');
			return this;
		}
	};
	this.glob=function(rootDir,expression){
		if(rootDir instanceof Array){
			rootDir.forEach(e=>this.glob(e.dir,e.glob));
		}else if(typeof(rootDir)==='object'){
			this.glob(rootDir.dir,rootDir.glob);
		}else if(expression instanceof Array){
			expression.forEach(e=>this.glob(rootDir,e));
		}else {
			this.loglist.push(barstyl('║')+' glob files from '+boldstyl(rootDir)+' | '+boldstyl(expression));
			let r=glob.sync(rootDir+'/'+expression);
			r=r.map(v=>v.substr(rootDir.length+1));
			this.data=mergeDatas(this.data,f2obj(this,rootDir,r));
			this.loglist.push(barstyl('║')+' ');
		}
		return this;
	};
	this.toCode=function(jsname){
		cookDatas(this.data);
		let json=JSON.stringify(this.data,0,'\t');
		let jstgt=jsname?'var '+jsname:'module.exports';
		let code=vmComments.map(v=>'// '+v).join('\n')
		+'\n\n'+jstgt+'=('+vmcode+')();';
		return code.replace('"%DATA%"',json);
	};
	this.toJson=function(){
		return JSON.stringify(this.data,0,'\t');
	};
	this.toFile=function(tgtFile,jsname,mute){
		let str=jsname===true?this.toJson():this.toCode(jsname);
		this.loglist.push(barstyl('║')+' WRITE '+boldstyl(tgtFile));
		this.loglist.push(barstyl('║')+' size  '+boldstyl((str.length/1024).toFixed(1))+' ko');
		if(!mute){
			console.log(barstyl('╔═')+' YSrcPack '+barstyl('════════'));
			while(this.loglist.length)console.log(this.loglist.shift());
			console.log(barstyl('╚═══════════════════'));
		}
		fs.writeFileSync(tgtFile,str,'utf-8');
	};
};


YSrcPack.process=function(options,oldCode){
	let sp = new YSrcPack();
	if(options.dir)sp.collect(options.dir);
	if(options.glob){
		sp.glob(options.glob instanceof Array?options.glob:[options.glob]);
	}

	let nukod;
	if(options.tgtJson){
		if(typeof(oldCode)==='string'){
			nukod=sp.toJson();
			if(oldCode===nukod)return nukod;
		}
		sp.toFile(options.tgtJson,true,options.mute);
	}else if(options.tgtFile){
		if(typeof(oldCode)==='string'){
			nukod=sp.toCode(options.jsName);
			if(oldCode===nukod)return nukod;
		}
		sp.toFile(options.tgtFile,options.jsName,options.mute);
	}
	return nukod;
};


YSrcPack.WebpackPlugin=function(options){
	this.options=options;
	this.lastcode='';
};

YSrcPack.WebpackPlugin.prototype.apply=function(compiler){
	compiler.hooks.beforeCompile.tap('YSrcPack', (params, callback) => {
		this.lastcode=YSrcPack.process(this.options,this.lastcode);
	});
};

module.exports=YSrcPack;
