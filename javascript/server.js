const http= require('http')
const fs=require('fs')
const path=require('path')
const port=3000
const server=http.createServer((req,res)=>{
    let filepath='.'+req.url
    if(filepath==='./'){
        filepath='./index.html'
    }else{
        filepath='./javascript' + filepath
    }
    console.log('Requested URL:', req.url);
    console.log('File path:', filepath);
    fs.access(filepath, fs.constants.F_OK, (err) => {
        if (err) {
            
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found.');
          } else {
    fs.readFile(filepath,'utf-8',(err,data)=>{
        if(err){
            res.writeHead(500,{'Content-Type':'text/plain'})
            res.end('Internal Server Error')
        }
        else{
            const extension = path.extname(filepath).toLowerCase()
            let contentType='text/html'
            if(extension==='.css'){
                contentType='text/css'
            }
            else if(extension==='.js'){
                contentType='text/javascript'
            }
                res.writeHead(200,{'Content-Type':contentType});
                res.end(data)

    }
});
}
    })
})



server.listen(port,()=>{
    console.log('server is running on http://localhost:${port}')

});