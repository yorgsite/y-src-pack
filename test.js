const path = require('path');
const YSrcPack = require('./YSrcPack.js');

let sp = new YSrcPack();

/*
	value determines the tgt file content:
 true for json
 string for web
 falsy for module
*/
let jsname='mymedias';
let tgtFile=path.resolve(__dirname,'_test_src/medias.js');
// --------- with script:

let test_as_script=function(){

	// --- dir method (collect) (can be an array of strings)
	// sp.collect(path.resolve(__dirname,'_test_src/medias'));

	// --- glob method (can be an array of objects)
	sp.glob(path.resolve(__dirname,'_test_src/medias'),['**/*.gif','**/*.png']);
	sp.glob(path.resolve(__dirname,'_test_src/medias'),'**/*.jpg');

	// --- write
	sp.toFile(tgtFile,jsname);
};


// --------- with options
let test_as_options=function(){

	YSrcPack.process({

		// --- dir method (collect) (can be an array of strings)
		dir:path.resolve(__dirname,'_test_src/medias'),
		// --- glob method (can be an array of objects)
		// glob:{
		// 	dir:path.resolve(__dirname,'_test_src/medias'),
		// 	glob:['**/*.gif','**/*.jpg']
		// },

		tgtFile:tgtFile,
		jsName:jsname
	});

};

test_as_options();
