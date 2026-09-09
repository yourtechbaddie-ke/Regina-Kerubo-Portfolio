const http=require('http'),fs=require('fs'),path=require('path');
const root=path.join(__dirname,'public');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.svg':'image/svg+xml'};
http.createServer((req,res)=>{const clean=decodeURIComponent((req.url||'/').split('?')[0]);const file=path.normalize(path.join(root,clean==='/'?'/index.html':clean));if(!file.startsWith(root))return res.writeHead(403).end('Forbidden');fs.readFile(file,(e,d)=>{if(e)return res.writeHead(404).end('Not found');res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'public,max-age=300'});res.end(d);});}).listen(process.env.PORT||10000,'0.0.0.0');
