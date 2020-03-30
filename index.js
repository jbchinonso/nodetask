var http = require('http')
var fs = require('fs')
const {parse} = require('querystring')
var server = http.createServer(function(req,resp){
	if(req.url === '/message'){
		let message = '';
		req.on('data', chunk => {
			message += chunk.toString();
		})
		req.on('end', () =>{
			var parsedMessage = parse(message)
			fs.writeFile('message.txt', parsedMessage.message, (err) =>{
				if(err) return console.log(err);
				
			})
			
			resp.end('ok')
		})
		
	}else{
	resp.writeHead(200,{'Content-Type' : 'text/html'})
	fs.readFile('./index.html', null, function(err, data){
		if(err){
			resp.writeHead(404);
			resp.write('page not found')
		}else{
			resp.write(data)
		}
		resp.end();
	})
	
	}
	
});

server.listen(8000,'localhost')

console.log('server started')