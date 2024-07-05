const http = require("http");
const app = require("./app");
const { port } = require("./config/keys");


// create a Server

const server = http.createServer(app);

//listen  server 

server.listen(port, ()=> console.log(`server is running on port ${port}`))
