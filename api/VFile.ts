
export interface VFileData {
	mime?:string;
	name?:string;
	size?:number;
	uri?:string;
	files?:VFileDataKeyed;
}
interface VFileDataKeyed {
    [id: string]: VFileData;
}

interface VFileConstructor {
    new (data:VFileData): VFile;
}
export class VFile {
	private _data:VFileData;
	public mime:string;
	public name:string;
	public size:number;
	public uri:string;
	public files:VFileDataKeyed;

	constructor(data:VFileData){
		this._data=data;
		this.mime=data.mime||'';
		this.name=data.name||'';
		this.size=data.size||0;
		if(data.uri)this.uri=data.uri;
		this.files=data.files||{};

	}
	// ------ private ----------
	private _uri2text(uri:string):string{
		return decodeURIComponent(atob(uri.split(';base64,').pop())
		.split('')
		.map(c=>'%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
		.join(''));
	}
	private _uri2json(uri:string):string{
		return JSON.parse(this._uri2text(uri));
	}
	private _uri2img(uri:string):HTMLImageElement{
		let img=document.createElement("img");
		img.src=uri;
		return img;
	}
	private _uri2audio(uri:string):HTMLAudioElement{
		return new Audio(uri);
	}
	private _uri2video(uri:string):HTMLVideoElement{
		let vdo=document.createElement('video');
		vdo.src=uri;
		return vdo;
	}
	get API():  (new (data:VFileData)=> VFile) {
		return VFile;
	}
	get text(): string {
		return this._uri2text(this.uri);
	}
	get json(): string {
		return this._uri2json(this.uri);
	}
	get img(): HTMLImageElement {
		return this._uri2img(this.uri);
	}
	get audio(): HTMLAudioElement {
		return this._uri2audio(this.uri);
	}
	get video(): HTMLVideoElement {
		return this._uri2video(this.uri);
	}
	static get zog(): string {
		return '';
	}
	public dir():Array<string>{
		if(this.mime==='dir'){
			return Object.keys(this.files);
		}else {
			return [];
		}
	}
	public all():Array<string>{
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
	}
	public get(path:string|Array<string>):VFile{
		let arr=((path instanceof Array)?path:path.split('/')).filter(v=>v!=='.');
		let tmp:VFileData=this._data;
		for(let i=0,tmpp=[];i<arr.length;i++){
			tmpp.push(arr[i]);
			if(tmp.files&&(arr[i] in tmp.files)){
				tmp=tmp.files[arr[i]];
			}else {
				throw('\nVFile Error:\npath "'+arr[i]+'" not found.');
			}
		}
		return new VFile(tmp);
	}
	
	public exists(path:string|Array<string>):boolean{
		let arr=((path instanceof Array)?path:path.split('/')).filter(v=>v!=='.');
		let tmp:VFileData=this._data;
		for(let i=0;i<arr.length;i++){
			if(tmp.files&&(arr[i] in tmp.files)){
				tmp=tmp.files[arr[i]];
			}else {
				return false;
			}
		}
		return true;
	}
	public toString():string{
		return this.uri;
	}
	public find(filter:string|Function):VFile{
		if(typeof(filter)!=='function'){
			let n=filter+'';
			filter=(v:VFileData)=>v.name&&v.name.indexOf(n)>-1;
		}
		let find_iter=(vfile:VFileData)=>{
			if(typeof(filter)==='function'&&filter(vfile))return vfile;
			if(vfile.mime==='dir'){
				for(let k in vfile.files){
					let r=find_iter(vfile.files[k]);
					if(r)return new VFile(r);
				}
			}
		};
		return find_iter(this._data);
	}
}

