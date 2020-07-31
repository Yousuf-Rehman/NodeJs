let http = require('http');
let url = require('url');//for url parsing, know the informath embedded in url
let path = require('path');
let fs = require('fs');//read file from disk and serve them
let mime = require('mime');//get file type of file json, image etc
let server = http.createServer();//http server

const RESPONSE_OK = 200;//response OK 
const RESPONSE_CLIENT_ERROR = 404; 
const RESPONSE_SERVER_ERROR = 500; /*Internal Server Error*/

let SendResponse = (response, code, type, msg) => {
    /*sending response header*/
    response.writeHead(code, { 'Content-Type': type });
    response.end(msg);
}

/*when server gets the request*/
server.on('request', (request, response) => {
    console.log('--incoming-http-request-- URL', request.url);
    let incomingUrl = url.parse(request.url, true);
    console.log(incomingUrl.pathname);

    let filename = path.join('.', incomingUrl.pathname);//'.' means current directory
    fs.exists(filename, (isExists) => {/*check if file exists*/
        if (!isExists) {
            return SendResponse(response, RESPONSE_CLIENT_ERROR,
                'text/plain', 'No resource found');
        }

        fs.readFile(filename, 'binary', (error, file) => {
            if (error) {
                return SendResponse(response, RESPONSE_SERVER_ERROR,
                    'text/plain', 'Server Error');
            }

            let type = mime.getType(filename);
            response.writeHead(RESPONSE_OK, {
                'Content-Type': type
            });
            response.write(file, 'binary')
            SendResponse(response, RESPONSE_CLIENT_ERROR,
                type, 'File Found!!!');
        });
    });
}).listen(9000); //listen to port 9000