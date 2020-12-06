const mime = require('mime');// npm install mime -save-dev
const fs = require('fs');
const styl=require('node-styl');
const glob = require('glob');

const {
	barstyl,
	dotstyl,
	boldstyl,
	f2uri,
	collect,
	f2obj,
	ft2obj,
	mergeDatas,
	cookDatas
} = require('./lib/tools.js');
const compilejs = require('./lib/compilejs.js');
const compilets = require('./lib/compilets.js');
// ---------- generated code
// const api=require('./VFileAPI.js');


// ------------- tools

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
	this.toCode=function(jsname,typescript){
		cookDatas(this.data);
		return (typescript?compilets:compilejs)(this.data,jsname);
	};
	this.toJson=function(){
		return JSON.stringify(this.data,0,'\t');
	};
	this.toFile=function(tgtFile,jsname,mute,typescript){
		let str=jsname===true?this.toJson():this.toCode(jsname,typescript);
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

/**
@param {object} options : see README.md
@param {string} [oldCode] (system) prevent file watching loop.
*/
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
		sp.toFile(options.tgtJson,true,options.mute,options.typescript);
	}else if(options.tgtFile){
		if(typeof(oldCode)==='string'){
			nukod=sp.toCode(options.jsName,options.typescript);
			if(oldCode===nukod)return nukod;
		}
		sp.toFile(options.tgtFile,options.jsName,options.mute,options.typescript);
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
