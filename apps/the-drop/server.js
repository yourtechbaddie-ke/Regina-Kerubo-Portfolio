const http=require('http'),fs=require('fs'),path=require('path');
const root=path.join(__dirname,'public');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp'};
http.createServer((req,res)=>{let p=req.url.split('?')[0];if(p==='/')p='/index.html';const file=path.join(root,path.normalize(p));if(!file.startsWith(root)){res.writeHead(403);return res.end('Forbidden')}fs.readFile(file,(e,d)=>{if(e){res.writeHead(404);return res.end('Not found')}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'text/plain; charset=utf-8'});res.end(d)})}).listen(process.env.PORT||10000,'0.0.0.0');
