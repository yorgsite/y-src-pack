const fs = require('fs');

const compilejs=function(data,jsname){
	let vfile=fs.readFileSync('./api/VFile.js','utf-8');
	let comments=fs.readFileSync('./api/comments.txt','utf-8')
	.split('\n').map(v=>'// '+v).join('\n');

	let json=JSON.stringify(data,0,'\t');
	let jstgt=jsname?'var '+jsname:'module.exports';
	let apicode=(vfile)
	.split('/**')
	.map((v,i)=>i>0?v.split('*/')[1]:v)
	.join('');
	apicode+='\n\nreturn new VFile('+json+');';
	let code=comments
	+'\n\n'+jstgt+'=(function(){'+apicode+'})();';
	return code;
};
module.exports=compilejs;
