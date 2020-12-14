

const fs = require('fs');
const Path=require('path');

const PATH_API=Path.resolve(__dirname,'../api/VFileAPI.ts');
const PATH_VFILE=Path.resolve(__dirname,'../api/VFile.ts');

const compilets=function(data,jsname){
	console.log('compilets');
	let comments=fs.readFileSync(Path.resolve(__dirname,'../api/comments.txt'),'utf-8')
	.split('\n').map(v=>'// '+v).join('\n');
	let src=fs.readFileSync(PATH_API,'utf-8');
	let txt=fs.readFileSync(PATH_VFILE,'utf-8');
	let json=JSON.stringify(data,0,'\t').split('\n').join('\n\t\t');

	let getz=[];
	let funkz=[];

	txt.substr(txt.indexOf('VFile {'))
	.split('\n').forEach((line, i) => {
		let ttx=line.trim();
		let doti=ttx.indexOf(':');
		let pari=ttx.indexOf('(');

		if(ttx.split(' ')[0]==='public'){
			// console.log('---');
		// if(ttx.split(/\\\\s+/g)[0]==='public'){
			// console.log(ttx);
			if(pari>-1&&pari<doti){
				let cpari=ttx.lastIndexOf(')');
				let nam=ttx.substring(7,pari);
				let args=ttx.substring(pari+1,cpari);
				let argNames=args.split(',').filter(v=>v).map(v=>v.split(':')[0]);
				let typ=ttx.substring(ttx.lastIndexOf(':')+1,ttx.lastIndexOf('{'));
				funkz.push([
					ttx,
					'	return this.root.'+nam+'('+argNames.join(',')+');',
					'}'
				].map(v=>'\t'.repeat(1)+v).join('\n'));
			}else {
				let cti=ttx.lastIndexOf(';');
				let nam=ttx.substring(7,doti);
				let typ=ttx.substring(doti+1,cti);
				getz.push([
					'get '+nam+'():'+typ+'{',
					'	return this.root.'+nam+';',
					'}'
				].map(v=>'\t'.repeat(1)+v).join('\n'));
			}
		}else if(ttx.split(' ')[0]==='get'){
			// console.log('---');
			let nam=ttx.substring(4,pari);
			getz.push([
				ttx,
				'	return this.root.'+nam+';',
				'}'
			].map(v=>'\t'.repeat(1)+v).join('\n'));
		}
	});

	let inherits=getz.concat(funkz).join('\n');

	src=src.split('"%VFile%"').join(txt);
	src=src.split('"%INHERIT%"').join(inherits);
	src=src.split('"%DATA%"').join(json);

	return comments+'\n'+src;
};
module.exports=compilets;
