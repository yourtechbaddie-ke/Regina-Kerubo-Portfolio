const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const port = process.env.PORT || 10000;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json'};
http.createServer((req,res)=>{
  let url = req.url.split('?')[0];
  if (url === '/') url = '/index.html';
  const file = path.join(root, url);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end('Not found'); }
  res.writeHead(200, {'Content-Type': types[path.extname(file)] || 'text/plain; charset=utf-8', 'Cache-Control':'no-cache'});
  fs.createReadStream(file).pipe(res);
}).listen(port,'0.0.0.0',()=>console.log(`From Scroll to Sale listening on ${port}`));
