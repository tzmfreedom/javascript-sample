const {HelloRequest, HelloReply} = require('./hello_pb.js');
const {GreeterClient} = require('./hello_grpc_web_pb.js');

// var client = new GreeterClient('http://localhost:50051');
var client = new GreeterClient('http://localhost:8080');

var request = new HelloRequest();
request.setName('World');

client.sayHello(request, {}, (err, response) => {
  console.log(response.getMessage());
});
