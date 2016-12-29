class Alumnos{
	constructor(cb){
		this.store = [];
		this.cb =cb;
	}
	add(alumno={}){
		this.store = [...this.store, Object.assign({}, {
			name: 'NoName',
			dni: '000000'
		}, alumno)];
		this.observe();
	}

	remove(index=-1){
		this.store = this.store.filter( (a,i)=> i!=index);
		this.observe();
	}
	observe(){
		this.cb(this.store);
	}
}
var al = new Alumnos((store)=>{
	store.forEach(e=>{
		console.log(e);
	})
});

al.add({dni: 213});
al.add({dni: 233});
