const http = require('http');
const url = require('url');
const Router = require('./router')
const Application = require('./application');
function createApplication(){
    return new Application();
}
createApplication.Router = Router;
module.exports = createApplication;