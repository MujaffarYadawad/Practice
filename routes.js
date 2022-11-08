const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if(url === '/'){
    fs.readFile("message.txt", { encoding: "utf-8"}, (err, data) =>{
      if(err){
        console.log(err)
      }
  res.write('<html>');
  res.write('<head><title>Enter Message</title><head>');
  res.write(`<body>${data}<body>`);
  res.write('<body><form action="/message" method="POST"><input  type="text" name="message"><button type"submit">send</button></form></body>');
  res.write('</html>');
   return res.end();
    });
  }
  
    if(url === '/message' && method === 'POST'){
    const body = [];
    req.on('data', (chunk)=> {
      console.log(chunk);
     body.push(chunk)
    });
   return req.on('end', () => {
     const parsedBody = Buffer.concat(body).toString();
     const message = parsedBody.split('=')[1];
     fs.writeFile('message.txt', message, (err) => {
      if(err){
        console.log(err);
      }
     res.statusCode = 302;
     res.setHeader('Location', '/');
     res.setHeader('Content-Type', 'text/html');
     return res.end();
     });
   
    });
  }
}
// module.exports = {
//   handler: requestHandler ,
//   someText: 'sss'
// };
// module.exports.handler = requestHandler;
// module.exports.someText = 'hello';

exports.handler = requestHandler;
exports.someText = 'hello';