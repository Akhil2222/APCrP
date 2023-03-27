import * as imageToData from 'image-data-uri'  // From diegozoracky
import * as fs from 'fs'
const key = 'hHvqzwieOLicqcd@=73Jko7FeqixDPGCOu'
const database = (req, res)=>{
    res.writeHead(200)
    const args = req.url.split(key)
    if(args[0] == '/img') {
        console.log(args[1],args[1].slice(0,4))
        if(args[1].slice(0,4) == 'http') {
            imageToData.default.encodeFromURL(args[1]).then(data => {
                res.write(data)
                res.end()
            }).catch(e=>{
                console.error('ERROR: FETCH REQUEST FAILED',"\n",e)
            })
        }else if(args[1].slice(0,4) == 'data'){
            res.write(args[1])
            res.end()
        }
    }else if(args[0] == "/script"){
        let assets = JSON.parse(fs.readFileSync('JSON/assets.json'))
        console.log(assets,args[1],decodeURI(args[2]))
        if(assets[args[1]] == undefined){
            assets[args[1]] = {
                'script':decodeURI(args[2])
            }
        }else{
            assets[args[1]].script = decodeURI(args[2])
        }
        console.log(JSON.stringify(assets))
        fs.writeFileSync('JSON/assets.json',JSON.stringify(assets))
        res.end()
    }
}
export default database 