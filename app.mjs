import database from "./Libraries/database.mjs";
import * as https from 'http'
import framework from "./Libraries/framework.mjs";

https.createServer((req,res)=>{
    let databaseSTRs = ['img','script']
    if(req.url.search('ico')+1){
        return 204
    }
    for(let i of databaseSTRs){
        if(req.url.search(i)+1){
            database(req,res)
            return 200
        }
    }
    framework(req,res)
}).listen(4200,'localhost')