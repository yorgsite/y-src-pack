
let vmcomments=[
	'File generated by y-src-pack',
	'/!\\ Use y-src-pack rather than manually editing',
	'',
	'Documentation removed. See:',
	'https://github.com/yorgsite/y-src-pack/blob/master/VFileAPI.md'
];

let vmcode=function(){

	"%VFILE%";

	let _root_="%DATA%";

	return new VFile(_root_);
};
module.exports={
	comments:vmcomments,
	code:vmcode
};
