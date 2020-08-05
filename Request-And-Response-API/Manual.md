# Node Modules

```js
let http = require('http');
let url = require('url');//for url parsing, know the informath embedded in url
let path = require('path');
let fs = require('fs');//read file from disk and serve them
let mime = require('mime');//file type, tell client what type of file is receiving like json, image etc
let server = http.createServer();//http server

 url.parse(request.url, true);/*true means, the query property will always be set to an object returned by the querystring module's*/


   
// path.join() Method   
// Import the path module 
const path = require('path'); 
   
// Joining 2 path-segments 
path1 = path.join("users/admin/files", "index.html"); 
console.log(path1)
users\admin\files\index.html 
   
// Joining 3 path-segments 
path2 = path.join("users", "geeks/website", "index.html"); 
console.log(path2) 
users\geeks\website\index.html

// Joining with zero-length paths 
path3 = path.join("users", "", "", "index.html"); 
console.log(path3)
users\index.html

```

# RESPONSES
404; Not Found
The server can not find the requested resource. In the browser, t
his means the URL is not recognized. In an API, this can also mean 
that the endpoint is valid but the resource itself does not exist. 
Servers may also send this response instead of 403 to hide the existence 
of a resource from an unauthorized client. This response code is probably 
the most famous one due to its frequent occurrence on the web.

500; Internal Server Error
The server has encountered a situation it doesn't know how to handle.
