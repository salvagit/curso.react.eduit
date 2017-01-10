class Request{
	constructor(){
		this.r = fetch;
	}

	get(path){
		return this.r(path)
		.then(response=> response.json())		
	}

	put(path, data={}){
		return this.r(path, {
			method: 'PUT',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
	}
}

export default Request;