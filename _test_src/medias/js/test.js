const YSrcPack = require('./YSrcPack.js');

const path = require('path');

YSrcPack.process({
	dir:path.resolve(__dirname,'_test_src/medias'),
	tgtFile:path.resolve(__dirname,'_test_src/medias.js'),
	jsName:'mymedias'
});
