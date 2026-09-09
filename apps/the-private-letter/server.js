const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, 'public');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml'};
const server = http.createServer((req,res)=>{
  const clean = decodeURIComponent((req.url || '/').split('?')[0]);
  const requested = clean === '/' ? '/index.html' : clean;
  const file = path.normalize(path.join(root, requested));
  if (!file.startsWith(root)) return res.writeHead(403).end('Forbidden');
  fs.readFile(file,(err,data)=>{
    if(err) return res.writeHead(404,{'Content-Type':'text/plain'}).end('Not found');
    res.writeHead(200,{'Content-Type':mime[path.extname(file)] || 'application/octet-stream','Cache-Control':'public, max-age=300'});
    res.end(data);
  });
});
server.listen(process.env.PORT || 10000,'0.0.0.0');
