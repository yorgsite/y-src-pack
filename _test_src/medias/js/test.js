const YSrcPack = require('./YSrcPack.js');


let fp = new YSrcPack();
const path = require('path');
const glob = require('glob');

// srcDir:path.resolve(__dirname,'src/medias'),
// tgtFile:path.resolve(__dirname,'_test_src/medias.js')


fp.collect(path.resolve(__dirname,'_test_src/medias'));
fp.toFile(path.resolve(__dirname,'_test_src/medias.js'),1,'mymedias');


fp.glob(path.resolve(__dirname,'_test_src/medias'),'**/*.gif')
// .then(()=>{
// 	return fp.glob(path.resolve(__dirname,'_test_src/medias'),'**/*.gif');
// })
.then(()=>{
	fp.toFile(path.resolve(__dirname,'_test_src/medias.js'),1,'mymedias');
});
