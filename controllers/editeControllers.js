
const jsonfile = require('jsonfile')
const file = './codestack/data.json'
const Fs = require('fs')  
// async function exists (path) {  
//   try {
//     await Fs.access(path)
//     return true
//   } catch {
//     return false
//   }
// }


module.exports.getdata = async (req,res)=>{
    // res.send('get data')
    // console.log(req.body);
    if(Fs.existsSync('./codestack/data.json')){   
        jsonfile.readFile(file, function (err, obj) {
            if (err) {
                // console.log(err);
                res.send({'status':false,'msg':err})
            }
            console.log('getdata');
            res.send({'status':true,'object':obj})
        })
    }
    else
    res.send({'status':false,'msg':'no page found'})
}
module.exports.savedata = async (req,res)=>{
    // res.send('save data')
    jsonfile.writeFile(file,req.body,function(err,obj){
        if (err) {
            console.log(err);
            res.send({'status':false,'msg':err})
        }
        res.send({'status':true,'object':obj})
    })
}