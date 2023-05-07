const jsonfile = require('jsonfile')
const file = './codestack/count.json'
const fs = require('fs')  


module.exports.increment = async (req,res)=>{
  
    const json = fs.readFileSync(file, 'utf-8');
    const obj = JSON.parse(json);
    // Reads count.json and converts to JS object

    obj.pageviews = obj.pageviews+1;
    if (req.query.type === 'visit-pageview') {
        obj.visits = obj.visits+1;
    }
    // Updates pageviews and visits (conditional upon URL param value)

    const newJSON = JSON.stringify(obj);
    // Converts result to JSON

    fs.writeFileSync(file, newJSON);
    res.send(newJSON);
    // Writes result to file and sends to user as JSON

}