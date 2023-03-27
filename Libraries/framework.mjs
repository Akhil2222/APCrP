import * as fs from 'fs'
let frameworkServer = (req,res)=>{
    let args = req.url.split('/').filter(a=>a)
    let file = fs.readFileSync(`${args[1]}/index.html`,'utf8')
    while(file.search('{{') > -1){
        let ind1 = file.search('{{')
        let ind2 = file.search('}}')+2
        let str = file.slice(ind1 + 2,ind2 - 2).replaceAll(' ','')
        let fileInf = fs.readFileSync(str,'utf8')
        file = file.replaceAll(file.slice(ind1,ind2),fileInf)
    }
    res.writeHead(200)
    res.write(file)
    res.end()
}
export default frameworkServer