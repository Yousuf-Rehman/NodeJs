let Posts = [];/*discourage*/
/*This store the Posts, Please use database Instead*/
let path = require('path');

module.exports.GetPosts = (request, response) => {
    //response.sendStatus(200);
    response.json(Posts)
}

module.exports.GetCreatePostPage = (request, response) => {
    //response.sendFile(path.join(__dirname+'/mainPage.html'));
    response.sendFile(path.join(__dirname + '/index.html'));
    console.log(request.body)
}

module.exports.CreatePost = (request, response) => {
    Posts.push(request.body);/*json body*/
    console.log(request.body);
    response.json(request.body);
}

/*Not Implemented*/
module.exports.DeletePost = (request, response) => {
    response.sendStatus(404);
}

module.exports.UpdatePost = (request, response) => {
    response.sendStatus(404);
}