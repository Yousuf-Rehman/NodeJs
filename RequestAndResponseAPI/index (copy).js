let http = require('http');
let url = require('url');//for url parsing, know the informath embedded in url
let path = require('path');
let fs = require('fs');//read file from disk and serve them
let mime = require('mime');   //file type, tell client what type of file receiving json, image etc
let server = http.createServer();//http server

const RESPONSE_OK = 200;//response OK 
const RESPONSE_CLIENT_ERROR = 404; /*Not Found
The server can not find the requested resource. In the browser, t
his means the URL is not recognized. In an API, this can also mean 
that the endpoint is valid but the resource itself does not exist. 
Servers may also send this response instead of 403 to hide the existence 
of a resource from an unauthorized client. This response code is probably 
the most famous one due to its frequent occurrence on the web.*/
const RESPONSE_SERVER_ERROR = 500; /*Internal Server Error
The server has encountered a situation it doesn't know how to handle.*/


let SendResponse = (response, code, type, msg) => {
    /*sending response header*/
    response.writeHead(code, { 'Content-Type': type });
    response.end(msg);
}

/*when server gets the request*/
server.on('request', (request, response) => {
    console.log('--incoming-http-request-- URL', request.url);
    let incomingUrl = url.parse(request.url, true);/*true means, the query property will 
    always be set to an object returned by the querystring module's*/
    console.log(incomingUrl);


    if (incomingUrl.path === '/index.html') {
        //pathname remove the slashes
        let filename = path.join('.', incomingUrl.pathname);//. means current directory
        path.exists(filename, (isExists) => {/*check if file exists*/
            if (!isExists) {
                return SendResponse(response, RESPONSE_CLIENT_ERROR,
                    'text/plain', 'No resource found');
            }

            fs.readFile(filename, 'binary', (error, file) => {
                if (error) {
                    return SendResponse(response, RESPONSE_SERVER_ERROR,
                        'text/plain', 'Server Error');
                }

                let type = mime.lookup(filename);
                response.writeHead(RESPONSE_OK, {
                    'Content-Type': type
                });
                response.write(file, 'binary')
                SendResponse(response, RESPONSE_CLIENT_ERROR,
                    type, 'File Found!!!');
            });
        });
    }
    else {
        return SendResponse(response, RESPONSE_CLIENT_ERROR,
            'text/plain', 'No resource found');
    }
}).listen(9000); //listen to port 9000