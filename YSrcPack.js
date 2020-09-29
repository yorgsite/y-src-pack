const mime = require('mime');// npm install mime -save-dev
const fs = require('fs');
const styl=require('node-styl');
const glob = require('glob');

// ---------- generated code
const api=require('./VFileAPI.js');


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
		let apicode=(api.code+'')
		.split('/**')
		.map((v,i)=>i>0?v.split('*/')[1]:v)
		.join('');
		let code=api.comments.map(v=>'// '+v).join('\n')
		+'\n\n'+jstgt+'=('+apicode+')();';
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
