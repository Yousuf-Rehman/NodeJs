let express = require('express');
let logger = require('morgan');
let bodyParser = require('body-parser');
let requestHanler = require('./requestHandler');

let app = express();
app.use(logger('combined'));/*middleware for logging*/
app.use(express.urlencoded({ extended: true}));/*Incase get empty body after parse*/
app.use(bodyParser.json());/*For post request, parsing it in json, 
Its a middleware parse the that will parse the body*/

/*browser alone itself only send get requests, so to get */
app.get('/', requestHanler.GetPosts)//all posts here
app.get('/post', requestHanler.GetCreatePostPage);
app.post('/post', requestHanler.CreatePost);//create new post
app.delete('/post', requestHanler.DeletePost);//delete the post
app.put('/post', requestHanler.UpdatePost);//update the post

app.listen(9200);