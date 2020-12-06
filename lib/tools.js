const mime = require('mime');// npm install mime -save-dev
const fs = require('fs');
const styl=require('node-styl');

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


module.exports={
	barstyl,
	dotstyl,
	boldstyl,
	f2uri,
	collect,
	f2obj,
	ft2obj,
	mergeDatas,
	cookDatas
};
