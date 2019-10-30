const { Namicorn } = require('namicorn')

const namicorn = new Namicorn()
let domain = 'mcafee2020.zil';
let currency = 'ETH'

namicorn.resolve(domain).then((res) => {
	console.log(res);
	
})